import { Button, CardActions, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLogin, useNotify, useSafeSetState, useTranslate } from 'ra-core';
import React from 'react';
import { Login } from 'react-admin';
import { Field, Form } from 'react-final-form';

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
    const [loading, setLoading] = useSafeSetState(false);
    const login = useLogin();
    const translate = useTranslate();
    const notify = useNotify();
    const classes = useStyles(props);

    const validate = (values) => {
        const errors = { email: undefined, password: undefined };

        if (!values.email) {
            errors.email = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    const submit = values => {
        setLoading(true);
        login(values, "/")
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                            ? 'ra.auth.sign_in_error'
                            : error.message,
                    'warning',
                    {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                    ? error.message
                                    : undefined,
                    }
                );
            });
    };

    return (
        <Login>
            <Form
                onSubmit={submit}
                validate={validate}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={classes.form}>
                            <div className={classes.input}>
                                <Field
                                    autoFocus
                                    id="email"
                                    name="email"
                                    component={Input}
                                    label={translate('ra.auth.email')}
                                    disabled={loading}
                                />
                            </div>
                            <div className={classes.input}>
                                <Field
                                    id="password"
                                    name="password"
                                    component={Input}
                                    label={translate('ra.auth.password')}
                                    type="password"
                                    disabled={loading}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>
                        <CardActions>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                disabled={loading}
                                className={classes.button}
                            >
                                {loading && (
                                    <CircularProgress
                                        className={classes.icon}
                                        size={18}
                                        thickness={2}
                                    />
                                )}
                                {translate('ra.auth.sign_in')}
                            </Button>
                        </CardActions>
                    </form>
                )}
            />
        </Login>
    );
};

export default MyLoginPage;