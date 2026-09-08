import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useStyles from './styles'


const Input = ({ half, handleChange, label, autoFocus, type, handleShowPassword, name }) => {
const { classes } = useStyles()
    return (
        <Grid size={{xs:6, sm: half ? 6:12}} >
            <TextField name={name} onChange={handleChange} 
            color='secondary' variant='outlined' required fullWidth 
            label={label} autoFocus={autoFocus} type={type} 
            slotProps={name === 'password' ? {
                input: { endAdornment: ( <InputAdornment className={classes.iconToggle} position='end'> 
                <IconButton onClick={handleShowPassword} size="large"> 
                    {type==='password' ? <Visibility /> : <VisibilityOff /> } 
                    </IconButton> </InputAdornment> ) }
            } : '' } />
        </Grid>
    );
}


export default Input
