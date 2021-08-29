import { Button, CardActions, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNotify, useSafeSetState, useTranslate } from 'ra-core';
import React from 'react';
import { Login, useRedirect } from 'react-admin';
import { Field, Form } from 'react-final-form';
import { useLocation, useParams } from 'react-router-dom';

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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Input = ({ meta: { touched, error }, input: inputProps, ...props }) => (
    <TextField error={!!(touched && error)} helperText={touched && error} {...inputProps} {...props} fullWidth />
);

const ResetPassword = (props) => {
    const [loading, setLoading] = useSafeSetState(false);
    const translate = useTranslate();
    const notify = useNotify();
    const redirect = useRedirect();
    const classes = useStyles(props);
    let query = useQuery();
    let { token } = useParams();
    let email = query.get("email");

    const submit = ({ password, password_confirmation }) => {
        setLoading(true);
        return axios.post('/reset-password', {
            'token': token,
            'email': email,
            'password': password,
            'password_confirmation': password_confirmation
        }).then(response => {
            setLoading(false);
            notify(response.data.message)
            redirect("/login");
        }).catch(error => {
            setLoading(false);

            if (error?.response?.data?.message) {
                let message = "";
                if (error?.response?.data?.errors !== undefined) {
                    for (let ms in error.response.data.errors) {
                        for (let m of error.response.data.errors[ms]) {
                            message += m + "\n";
                        }
                    }
                } else {
                    message = error?.response?.data?.message;
                }
                notify(message);
            } else {
                notify(error?.message);
            }
        });
    };

    return (
        <Login>
            <Form onSubmit={submit} render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field id="password" name="password" component={Input} label={translate('ra.auth.password')} type="password" disabled={loading} />
                        </div>
                        <div className={classes.input}>
                            <Field id="password_confirmation" name="password_confirmation" component={Input} label={translate('ra.auth.password_confirmation')} type="password" disabled={loading} />
                        </div>
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

export default ResetPassword;