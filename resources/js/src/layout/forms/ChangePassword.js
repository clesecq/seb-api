import { Button, CardActions, CircularProgress, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNotify, useRedirect, useSafeSetState, useTranslate } from 'ra-core';
import React from 'react';
import { useAuthenticated } from 'react-admin';
import { Field, Form } from 'react-final-form';
import { Link as RouterLink } from 'react-router-dom';
import BaseForm from './Form';

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

const ChangePassword = (props) => {
    useAuthenticated();
    const [loading, setLoading] = useSafeSetState(false);
    const translate = useTranslate();
    const notify = useNotify();
    const redirect = useRedirect();
    const classes = useStyles(props);

    const submit = ({current_password, password, password_confirmation}) => {
        setLoading(true);
        axios.get('/sanctum/csrf-cookie').then(response => {
            return axios.put('/user/password', {
                'current_password': current_password,
                'password': password,
                'password_confirmation': password_confirmation
            }).then(response => {
                setLoading(false);
                notify('ra.auth.password_changed');
                redirect("/profile");
            }).catch(error => {
                setLoading(false);
                console.log(error);
                notify(error?.response?.data?.message);
            });
        });
    };

    return (
        <BaseForm>
            <Form onSubmit={submit} render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field id="current_password" name="current_password" component={Input} label={translate('ra.auth.current_password')}
                                type="password" disabled={loading} autoComplete="current-password" />
                        </div>
                        <div className={classes.input}>
                            <Field id="password" name="password" component={Input} label={translate('ra.auth.new_password')} type="password"
                                disabled={loading} />
                        </div>
                        <div className={classes.input}>
                            <Field id="password_confirmation" name="password_confirmation" component={Input} label={translate('ra.auth.password_confirmation')} type="password"
                                disabled={loading} helperText={<Link component={RouterLink} to="/profile">{translate('ra.auth.back')}</Link>} />
                        </div>

                    </div>
                    <CardActions>
                        <Button variant="contained" type="submit" color="secondary" disabled={loading} className={classes.button} >
                            {loading && (
                                <CircularProgress className={classes.icon} size={18} thickness={2} />
                            )}
                            {translate('ra.auth.change_password')}
                        </Button>
                    </CardActions>
                </form>
            )} />
        </BaseForm>
    );
};

export default ChangePassword;