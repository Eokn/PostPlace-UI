import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material'
// import { GoogleLogin } from 'react-google-login'
import useStyles from './styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
// import { FcGoogle } from 'react-icons/fc'
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import Input from '../../components/Input/Input'
import { auth, signUpAuth, signInAuth, googleSignUp } from '../../features/auth/authSlice'






// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// function App() {
//   return (
//     <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//       <GoogleLogin
//         onSuccess={credentialResponse => {
//           console.log(credentialResponse);
//         }}
//         onError={() => {
//           console.log('Login Failed');
//         }}
//       />
//     </GoogleOAuthProvider>
//   );
// }








const Auth = () => {
    const { classes } = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false)
    const [isSignUp, setIsSignUp] = React.useState(false)
    const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:'' }
    const [formData, setFormData] = React.useState(initialState)

    const handleShowPassword = () => {
        setShowPassword(x => !x)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isSignUp){
            dispatch(signUpAuth({formData, navigate}))
            
        }

        else{
            dispatch(signInAuth({formData, navigate}))

        }

    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value })
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch(auth({ result, token }))

            dispatch(googleSignUp({ ...result }))
            
            navigate(-1);
            
        } catch (error) {
            console.log(error)
        }

    }
    const googleFailure = (err) => {console.log(`err: ${err.error} details: ${err.details}`)}
    const switchMode = () => {
        setIsSignUp(x => !x)
        setShowPassword(false)
    }
    return (
        <Container component='main' disableGutters maxWidth='xs' >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} children={(<LockOutlinedIcon className={classes.signIn}/>)}>
                    
                </Avatar>
                <Typography variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={1}>
                        {
                            isSignUp && (
                                <>

                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                    
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={!showPassword ? 'password' : 'text' } handleShowPassword={handleShowPassword} />
                        {isSignUp && ( <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> )}
                    </Grid>
                    {/* {<GoogleLogin clientId={import.meta.VITE_APP_CLIENTID} 
                    render={(props) => ( 
                    <Button className={classes.googleButton} color='secondary' fullWidth 
                    onClick={props.onClick} disabled={props.disabled} 
                    startIcon={ <FcGoogle className={classes.iconBackground}/> } 
                    variant='contained'  >Sign in with google</Button> )} 
                    onSuccess={googleSuccess} 
                    onFailure={googleFailure} 
                    cookiepolicy='single_host_origin'/>} */}
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} > {isSignUp ? 'Sign up' : 'Sign In'} </Button>
                    <Typography variant='h5'>Or...</Typography>
                    <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={()=>{dispatch(signUpAuth({formData:{ firstName:'', lastName:'', email:'guest@mail.com', password:'guest123', confirmPassword:'guest123' }, navigate}))}} > Use Guest account </Button>
                    <Grid container sx={{ justifyContent: 'flex-end' }}>
                        <Grid>
                            <Button onClick={switchMode}> {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"} </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
