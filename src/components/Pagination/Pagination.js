import React from 'react'
import useStyles from './styles.js'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { selectNumberOfPages } from '../../features/posts/postsSlice.js'

const Paginate = ({ page, searchQuery: {searchQuery, tags} }) => {
    const classes = useStyles()
    const searching = searchQuery !== null || tags
    const number = useSelector(selectNumberOfPages)
    
    

    return (
        <Pagination classes={ {ul:classes.ul} } count={number} page={Number(page) || 1} variant='outlined' renderItem={(item)=>( <PaginationItem {...item} component={Link} to={!searching ? `/posts?page=${item.page}` : `/posts/search?searchQuery=${searchQuery || 'none'}&tags=${tags}&page=${item.page}`} /> )} >
            
        </Pagination>
    )
}

export default Paginate
