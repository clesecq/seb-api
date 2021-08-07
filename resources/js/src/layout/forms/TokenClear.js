import { Button, CardActions, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNotify, useRedirect, useSafeSetState, useTranslate } from 'ra-core';
import React from 'react';
import { useAuthenticated } from 'react-admin';
import { Form } from 'react-final-form';
import BaseForm from './Form';

const useStyles = makeStyles(
    (theme) => ({
        form: {
            padding: '0 1em 1em 1em',
            textAlign: 'center',
            width: '420px'
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

const TokenClear = (props) => {
    useAuthenticated();
    const [loading, setLoading] = useSafeSetState(false);
    const [step, setStep] = useSafeSetState(0);
    const [qrcode, setQrcode] = useSafeSetState("");
    const translate = useTranslate();
    const notify = useNotify();
    const redirect = useRedirect();
    const classes = useStyles(props);

    const submit = (values) => {
        setLoading(true);
        return axios.delete('/api/tokens').then(response => {
            notify("ra.auth.token.clear.cleared");
            setLoading(false);
            redirect("/profile");
        }).catch(error => {
            console.log(error);
            notify(error?.response?.data?.message);
        });
    };

    return (
        <BaseForm>
            <Form onSubmit={submit} render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        {translate('ra.auth.token.clear.ask')}
                    </div>
                    <CardActions>
                        <Button variant="contained" type="submit" color="secondary" disabled={loading} className={classes.button} >
                            {loading && (
                                <CircularProgress className={classes.icon} size={18} thickness={2} />
                            )}
                            {translate('ra.auth.token.clear.clear')}
                        </Button>
                        <Button variant="contained" onClick={() => { redirect('/profile') }} color="secondary" disabled={loading} className={classes.button} >
                            {translate('ra.auth.cancel')}
                        </Button>
                    </CardActions>
                </form>
            )} />
        </BaseForm>
    );
};

export default TokenClear;