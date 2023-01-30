import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Select, MenuItem, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/system';
import axios from '../api/axios';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function RegisterPage() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [user, setUser] = useState({
        username: "",
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userStreetName: "",
        userStreetNumber: "",
        userTown: "",
        userPLZ: "",
        userCountry: "",
        password: "",
        passwordRepeat: "",
        role: 1
    
    })

    const handleSubmit = e => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:5000/authentification/sign-up',
            data: {
                username: user.username,
                userFirstname: user.userFirstName,
                userLastname: user.userLastName,
                userEmail: user.userEmail,
                userStreetNumber: user.userStreetNumber,
                userStreetName: user.userStreetName,
                userTown: user.userTown,
                userPLZ: user.userPLZ,
                userCountry: user.userCountry,
                password: user.password,
                password_repeat: user.passwordRepeat,
                RoleID: 1
            }
          }).then((res) => {
            setShowSuccess(true);
          }).catch(err => console.log(err.response));;
    }
    
    const handleChange = (e) => {
        const type = e.target.type
        const name = e.target.name
    
        const value = type === "checkbox"
            ? e.target.checked
            : e.target.value
    
            setUser(prevData => ({...prevData, [name]: value}))
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container>
            {showSuccess && <Alert severity="success">Benutzer registriert!</Alert>}
                <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', lg: '6rem' }, textDecoration: 'underline' }} gutterBottom mt={2.5}>
                    Registrieren
                </Typography>

                <Grid container spacing={1}>

                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='username'
                                value={user.username}
                                type='text'
                                onChange={handleChange}
                                label="Username"
                                autoComplete='username' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='userFirstName'
                                value={user.userFirstName}
                                type='text'
                                onChange={handleChange}
                                label="Vorname"
                                autoComplete='given-name' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='userLastName'
                                value={user.userLastName}
                                type='text'
                                onChange={handleChange}
                                label="Nachname"
                                autoComplete='name' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='userEmail'
                                value={user.userEmail}
                                type='email'
                                onChange={handleChange}
                                label="E-Mail"
                                autoComplete='email' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='userStreetName'
                                value={user.userStreetName}
                                type='text'
                                onChange={handleChange}
                                label="Straße"
                                autoComplete='address-line1' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='userStreetNumber'
                                value={user.userStreetNumber}
                                type='text'
                                onChange={handleChange}
                                label="Haus Nr."
                                autoComplete='address-line2' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='userTown'
                                value={user.userTown}
                                type='text'
                                onChange={handleChange}
                                label="Stadt"
                                autoComplete='address-line2' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='userPLZ'
                                value={user.userPLZ}
                                type='text'
                                onChange={handleChange}
                                label="PLZ"
                                autoComplete='postal-code' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='userCountry'
                                value={user.userCountry}
                                type='text'
                                onChange={handleChange}
                                label="Land"
                                autoComplete='country-name' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='password'
                                value={user.password}
                                type='password'
                                onChange={handleChange}
                                label="Passwort"
                                autoComplete='password' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <TextField
                                fullWidth
                                name='passwordRepeat'
                                value={user.passwordRepeat}
                                type='password'
                                onChange={handleChange}
                                label="Passwort wiederholen"
                                autoComplete='password' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} mt={4}>
                        <Select
                            name='role'
                            fullWidth
                            type='text'
                            labelId="role-label"
                            id="role-label"
                            value={user.role}
                            label="Rolle"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Lehrer</MenuItem>
                            <MenuItem value={2}>Raumbetreuer</MenuItem>
                        </Select>
                    </Grid>
                <Grid item xs={12} mt={6}>
                    <Box>
                        <Button variant='contained' onClick={handleSubmit}>
                            Registrieren
                        </Button>
                    </Box>
                </Grid>

                </Grid>
            </Container>
        </ThemeProvider>
    );
}
