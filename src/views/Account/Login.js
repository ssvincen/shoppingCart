import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useHistory, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, AlertTitle, Stack } from '@mui/material';
import { userService } from "../../Services/user.service";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props} >
            {"Copyright © "}
            <Link color="inherit" to={{ pathname: "https://www.betsoftware.com/" }} target="_blank">
                Bet Entertainment
            </Link>{' '}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorDetail, setErrorDetail] = useState("");
    const [loading, setLoading] = useState(false);
    let history = useHistory();
    let location = useLocation();

    const validateForm = () => {
        let isValid = true;
        if (!email || !password) {
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        let { from } = location.state || { from: { pathname: "/" } };
        const newPost = {
            userName: email,
            password: password
        };

        try {
            const resp = (await userService.BettingAPI.post('punters/login', newPost)).data;
            console.log(resp)
            setLoading(false);
            if (resp.responseType !== -1) {
                sessionStorage.setItem('BettingToken', JSON.stringify(resp.responseObject.accessToken));
                sessionStorage.setItem('BettingUser', email);
                history.replace(from);
            }
            setErrorDetail(resp.responseMessage);
            setPassword('')
        } catch (err) {
            console.log('error ' + err)
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: "url(https://source.unsplash.com/random)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }} />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>

                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >

                            <TextField margin="normal" type="text" label="Email Address"
                                value={email} fullWidth required autoFocus
                                onChange={(event) => setEmail(event.target.value)} />


                            <TextField margin="normal" type="password" label="Password"
                                value={password} fullWidth required
                                onChange={(event) => setPassword(event.target.value)} />

                            <FormControlLabel label="Remember me"
                                control={<Checkbox value="remember" color="primary" />} />

                            <Button type="submit" disabled={!validateForm() || loading}
                                fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            {errorDetail &&
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        {errorDetail}
                                    </Alert>
                                </Stack>
                            }

                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="signUp" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Login;
