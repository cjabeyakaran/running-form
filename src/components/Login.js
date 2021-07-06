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
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

// used material-ui sign in template
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(1)
    }
}));

function Login() {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const classes = useStyles();

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

    return (
        <>
            <Container component="main" maxWidth="xs" className={classes.root}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                {error && <Alert severity="error"> {error} </Alert>}
                <form onSubmit={handleSubmit} className={classes.form}>
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
                        className={classes.button}
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