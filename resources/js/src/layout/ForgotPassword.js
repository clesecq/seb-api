import { Button, CardActions, CircularProgress, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNotify, useSafeSetState, useTranslate } from 'ra-core';
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

const Input = ({ meta: { touched, error }, input: inputProps, ...props }) => (
    <TextField error={!!(touched && error)} helperText={touched && error} {...inputProps} {...props} fullWidth />
);

const ForgotPassword = (props) => {
    const [loading, setLoading] = useSafeSetState(false);
    const translate = useTranslate();
    const notify = useNotify();
    const classes = useStyles(props);

    const submit = ({email}) => {
        setLoading(true);
        axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.post('/forgot-password', {
                'email': email
            }).then(response => {
                setLoading(false);
                notify(response.data.message)
            }).catch(error => {
                setLoading(false);
                notify(error?.response?.data?.message);
            });
        });
    };

    return (
        <Login>
            <Form onSubmit={submit} render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field autoFocus id="email" name="email" component={Input} label={translate('ra.auth.email')} disabled={loading} />
                        </div>
                        <Link component={RouterLink} to="/login">{translate('ra.auth.back')}</Link>
                    </div>
                    <CardActions>
                        <Button variant="contained" type="submit" color="secondary" disabled={loading} className={classes.button} >
                            {loading && (
                                <CircularProgress className={classes.icon} size={18} thickness={2} />
                            )}
                            {translate('ra.auth.reset_password')}
                        </Button>
                    </CardActions>
                </form>
            )} />
        </Login>
    );
};

export default ForgotPassword;