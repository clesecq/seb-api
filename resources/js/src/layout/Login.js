import { Button, CardActions, CircularProgress, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLogin, useNotify, useSafeSetState, useTranslate } from 'ra-core';
import React from 'react';
import { Login } from 'react-admin';
import { Field, Form } from 'react-final-form';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(
    (theme) => ({
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginTop: '1em',
        },
        button: {
            width: '100%',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
    { name: 'RaLoginForm' }
);

const Input = ({
    meta: { touched, error }, // eslint-disable-line react/prop-types
    input: inputProps, // eslint-disable-line react/prop-types
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

const MyLoginPage = (props) => {
    const inputRef = React.useRef();
    const [loading, setLoading] = useSafeSetState(false);
    const [twoFA, setTwoFA] = useSafeSetState(false);
    const login = useLogin();
    const translate = useTranslate();
    const notify = useNotify();
    const classes = useStyles(props);

    const submit = values => {
        setLoading(true);
        if (twoFA) {
            axios.post('/two-factor-challenge', {
                code: values.code,
                recovery_code: values.code
            }).then(response => {
                setLoading(false);
                let data = response.data;
                if (data?.two_factor === true) {
                    setTwoFA(true);
                } else {
                    login(data, "/");
                }
            }).catch(error => {
                setLoading(false);
                notify(error?.response?.data?.message, 'warning');
            });
        } else {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/login', values).then(response => {
                    setLoading(false);
                    let data = response.data;
                    if (data?.two_factor === true) {
                        setTwoFA(true);
                    } else {
                        login(data, "/");
                    }
                    inputRef.current.focus();
                }).catch(error => {
                    setLoading(false);
                    notify(error?.response?.data?.message, 'warning');
                });
            });
        }
    };

    return (
        <Login>
            <Form onSubmit={submit} render={({ handleSubmit }) => (twoFA ?
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field inputRef={inputRef} id="code" name="code" component={Input} label={translate('ra.auth.2fa.verification_code')} disabled={loading} />
                        </div>
                    </div>
                    <CardActions>
                        <Button variant="contained" type="submit" color="secondary" disabled={loading} className={classes.button} >
                            {loading && (
                                <CircularProgress className={classes.icon} size={18} thickness={2} />
                            )}
                            {translate('ra.auth.2fa.login')}
                        </Button>
                    </CardActions>
                </form>
                :
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field autoFocus id="username" name="username" component={Input} label={translate('ra.auth.username')} disabled={loading} />
                        </div>
                        <div className={classes.input}>
                            <Field id="password" name="password" component={Input} label={translate('ra.auth.password')} type="password"
                                disabled={loading} autoComplete="current-password" helperText={
                                    <Link component={RouterLink} to="/forgot-password">{translate('ra.auth.forgot')}</Link>
                                } />
                        </div>

                    </div>
                    <CardActions>
                        <Button variant="contained" type="submit" color="secondary" disabled={loading} className={classes.button} >
                            {loading && (
                                <CircularProgress className={classes.icon} size={18} thickness={2} />
                            )}
                            {translate('ra.auth.sign_in')}
                        </Button>
                    </CardActions>
                </form>
            )} />
        </Login>
    );
};

export default MyLoginPage;