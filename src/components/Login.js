import React, { useState } from 'react';
import {
    Container,
    Avatar,
    Typography,
    Grid,
    TextField,
    Button, 
    Link
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

function Login() {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        const { email, password } = e.currentTarget.elements;
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            login(email.value, password.value);
            history.push("/");
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false);
    }

    return(
        <>
            <Container component="main" maxWidth="xs">
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                {error && <Alert severity="error"> {error} </Alert>}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    > Log In</Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don't have an account yet? Sign up
                            </Link>
                        </Grid>
                    </Grid>    
                </form>
            </Container>
        </>
    );
}

export default Login;