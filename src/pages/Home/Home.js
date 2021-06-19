import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from '../../components/Form/Form'
import Posts from '../../components/Posts/Posts'
import { getAllPosts, getPostsWithSearch, selectLoading, selectNumberOfPages } from '../../features/posts/postsSlice'
import useStyles from './styles'
import Pagination from '../../components/Pagination/Pagination'
import ChipInput from 'material-ui-chip-input'
import { useHistory, useLocation } from 'react-router'
import SearchIcon from '@material-ui/icons/Search';
import { selectProfileExists } from '../../features/auth/authSlice'


function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const signedIn = useSelector(selectProfileExists)
  const number = useSelector(selectNumberOfPages)
  const loading = useSelector(selectLoading)
  const query = useQuery()
  const page = query.get('page') || 1
  const searchQuery = { searchQuery: query.get('searchQuery'), tags: query.get('tags') }
  const [search, setSearch] = React.useState('')
  const [tags, setTags] = React.useState([])
  
    const searching = (searchQuery.searchQuery !== null && searchQuery.searchQuery !== 'none') || searchQuery.tags !== null


  React.useEffect(()=>{
    if(page && !loading) {
        if(searching){
          
            dispatch(getPostsWithSearch( { searchQuery: searchQuery.searchQuery, tags: searchQuery.tags, page } ))
        }
        else{
        dispatch(getAllPosts(page))
        }
    }
  }, [page])
  

  const searchPosts = () => {
    if(search.trim() || tags.length !== 0 ) {
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}&page=1`)
      dispatch(getPostsWithSearch( { search, tags:tags.join(','), page:1 }))
    }
    else {
      history.push('/')
    }
  }
  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      searchPosts()
    }
  }
  //Add and delete functions for the chip input, add strips the search tag of space and # before adding it.
  const handleAdd = (tag) => {
    setTags([...tags, tag.replace(/[# ]/g, '')])

  }
  const handleDelete = (tag) => {
    setTags(tags.filter(x=>x!==tag))
  }
    return (
        <Grow in>
            <Container className={classes.appContainer} maxWidth='xl'>
              <Grid container justify='space-between' alignItems='stretch' spacing={2} className={`${!signedIn ? classes.notSignedIn : ''} ${classes.gridContainer}`} >
                {!signedIn && (<Grid item><AppBar position='static' color='inherit' className={classes.appBarSearch} >
                    <TextField name='search' className={classes.titleCorrect} InputLabelProps={{classes:{formControl: classes.formPos}}}  color='secondary' dense variant='outlined' label='Search Posts' value={search} onKeyPress={handleKeyPress} onChange={(e)=>{setSearch(e.target.value)}} />
                    <ChipInput value={tags} color='secondary' dense onAdd={handleAdd} onDelete={handleDelete} className={classes.chipInput} label='Search By Tags' variant='outlined' />
                    <Button variant='contained' onClick={searchPosts} className={classes.searchButton} color='primary' >Search <SearchIcon fontSize='small' /> </Button>
                  </AppBar></Grid> )}
                <Grid item xs={12} sm={!signedIn ? 12 : 7} md={!signedIn ? 12 : 9} className={classes.heightFix}>
                  <Posts />
                </Grid>
                {signedIn && (<Grid item xs={12} sm={5} md={3}>
                  <AppBar position='static' color='inherit' className={classes.appBarSearchSigned} >
                    <TextField name='search' color='secondary' variant='outlined' label='Search Posts' fullWidth value={search} onKeyPress={handleKeyPress} onChange={(e)=>{setSearch(e.target.value)}} />
                    <ChipInput value={tags} color='secondary' onAdd={handleAdd} onDelete={handleDelete} className={classes.chipInput} label='Search By Tags' variant='outlined' />
                    <Button variant='contained' onClick={searchPosts} color='primary' >Search <SearchIcon fontSize='small' /> </Button>
                  </AppBar>
                  <Form />
                </Grid>)}
              </Grid>
              <Paper className={`${classes.pagination} ${number > 1 ? '' : classes.hidden} ${classes.marginAdjust}`} elevation={6}> 
                    <Pagination page={page} searchQuery={searchQuery} />
                  </Paper>
            </Container>
          </Grow>
    )
}

export default Home
