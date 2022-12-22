import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import useStyles from './styles'


const Input = ({ half, handleChange, label, autoFocus, type, handleShowPassword, name }) => {
const classes = useStyles()
    return (
        <Grid item xs='6' sm={half?'6':'12'} >
            <TextField name={name} onChange={handleChange} color='secondary' variant='outlined' required fullWidth label={label} autoFocus={autoFocus} type={type} InputProps={name === 'password' ? {
                endAdornment: ( <InputAdornment className={classes.iconToggle} position='end'> <IconButton onClick={handleShowPassword} > {type==='password' ? <Visibility /> : <VisibilityOff /> } </IconButton> </InputAdornment> )
            } : null } />
        </Grid>
    )
}


export default Input
