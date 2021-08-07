import { Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React, { useMemo } from 'react';
import { createMuiTheme, TopToolbar } from 'react-admin';
import { withRouter } from 'react-router-dom';
import theme from '../Theme';

const useStyles = makeStyles(
    (theme) => ({
        form: {
            padding: '1em',
            textAlign: 'justify'
        },
        input: {
            marginTop: '1em',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
    { name: 'RaLoginForm' }
);

const Copying = withRouter(({ history: { goBack }, ...props }) => {
    const classes = useStyles(props);
    const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);

    return (
        <div style={{backgroundImage: 'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)', backgroundAttachment: 'fixed', minHeight: '100vh', paddingTop: '1em', paddingBottom: '1em'}}>
            <ThemeProvider theme={muiTheme}>
                <Container maxWidth="md"style={{backgroundColor: "#424242", color: "#ffffff"}}>
                    <div className={classes.form}>
                        <Typography variant="h4" component="h1" gutterBottom>License and attributions</Typography>
                        <Typography variant="h5" component="h2" gutterBottom>Copyright notice</Typography>
                        <Typography gutterBottom>
                            Copyright © 2021 - Association Amicale des Étudiants et Anciens
                            Étudiants du Département Informatique de l'IUT Robert Schuman et al.<br />
                            Seb is free software: you can redistribute it and/or modify
                            it under the terms of the GNU General Public License Affero as published by
                            the Free Software Foundation, either version 3 of the License, or
                            (at your option) any later version.<br />
                            This program is distributed in the hope that it will be useful,
                            but WITHOUT ANY WARRANTY; without even the implied warranty of
                            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
                            As per required by the aforementioned license, you may obtain a copy of the
                            source code of Seb <a href="https://git.unistra.fr/amicale-core/seb">here</a> and
                            read the whole license <a href="https://git.unistra.fr/amicale-core/seb/-/blob/master/LICENSE.md">there</a>.
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>Dependencies</Typography>
                        <Typography gutterBottom>
                            Seb isn't built from the ground up. Our most notable dependencies are:
                        </Typography>
                        <ul>
                            <li><a href="https://github.com/laravel/laravel">Laravel</a> - Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></li>
                            <li><a href="https://github.com/marmelab/react-admin">React-admin</a> - Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></li>
                            <li><a href="https://github.com/facebook/react">React</a> - Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></li>
                            <li><a href="https://github.com/axios/axios">Axios</a> - Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></li>
                            <li><a href="https://github.com/jashkenas/underscore">Underscore</a> - Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></li>
                        </ul>
                        <Typography variant="h5" component="h2" gutterBottom>Contributors</Typography>
                        <ul>
                            <li><a href="github.com/M4xi1m3/">Maxime "M4x1m3" Friess</a> <a href="mailto:maxime.friess@pm.me">&lt;maxime.friess@pm.me&gt;</a> </li>
                        </ul>
                    </div>
                    <TopToolbar style={{paddingTop: 0}}>
                        <Button className={classes.button} color="primary" onClick={goBack} >
                            Go back
                        </Button>
                    </TopToolbar>
                </Container>
            </ThemeProvider>
        </div>
    );
});

export default Copying;