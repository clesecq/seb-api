import { Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React, { useMemo } from 'react';
import { createMuiTheme, TopToolbar, useTranslate } from 'react-admin';
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
    const translate = useTranslate();

    return (
        <div style={{ backgroundImage: 'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)', backgroundAttachment: 'fixed', minHeight: '100vh', paddingTop: '1em', paddingBottom: '1em' }}>
            <ThemeProvider theme={muiTheme}>
                <Container maxWidth="md" style={{ backgroundColor: "#424242", color: "#ffffff" }}>
                    <div className={classes.form}>
                        <Typography variant="h4" component="h1" gutterBottom>{translate('copying.title')}</Typography>
                        <Typography variant="h5" component="h2" gutterBottom>{translate('copying.notice')}</Typography>
                        <Typography gutterBottom>
                            {translate('copying.agpl.line1')}<br />
                            {translate('copying.agpl.line2')}<br />
                            {translate('copying.agpl.line3.start')} <a href="https://git.unistra.fr/amicale-core/seb">{translate('copying.agpl.line3.here')}</a> {translate('copying.agpl.line3.continue')} <a href="https://git.unistra.fr/amicale-core/seb/-/blob/master/LICENSE.md">{translate('copying.agpl.line3.there')}</a>{translate('copying.agpl.line3.end')}
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>{translate('copying.dependencies')}</Typography>
                        <Typography gutterBottom>
                            {translate('copying.dependencies2')}
                        </Typography>
                        <ul>
                            <li><a href="https://github.com/laravel/laravel">Laravel</a> - {translate('copying.released')} <a href="https://opensource.org/licenses/MIT">{translate('copying.license.mit')}</a></li>
                            <li><a href="https://github.com/marmelab/react-admin">React-admin</a> - {translate('copying.released')} <a href="https://opensource.org/licenses/MIT">{translate('copying.license.mit')}</a></li>
                            <li><a href="https://github.com/facebook/react">React</a> - {translate('copying.released')} <a href="https://opensource.org/licenses/MIT">{translate('copying.license.mit')}</a></li>
                            <li><a href="https://github.com/axios/axios">Axios</a> - {translate('copying.released')} <a href="https://opensource.org/licenses/MIT">{translate('copying.license.mit')}</a></li>
                            <li><a href="https://github.com/jashkenas/underscore">Underscore</a> - {translate('copying.released')} <a href="https://opensource.org/licenses/MIT">{translate('copying.license.mit')}</a></li>
                        </ul>
                        <Typography variant="h5" component="h2" gutterBottom>{translate('copying.contributors')}</Typography>
                        <ul>
                            <li><a href="github.com/M4xi1m3/">Maxime "M4x1m3" Friess</a> <a href="mailto:maxime.friess@pm.me">&lt;maxime.friess@pm.me&gt;</a> </li>
                        </ul>
                    </div>
                    <TopToolbar style={{ paddingTop: 0 }}>
                        <Button className={classes.button} color="primary" onClick={goBack} >
                            {translate('ra.auth.back')}
                        </Button>
                    </TopToolbar>
                </Container>
            </ThemeProvider>
        </div>
    );
});

export default Copying;