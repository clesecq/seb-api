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

const TwoFactorEnable = (props) => {
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
        switch (step) {
            case 0:
                return axios.post('/user/two-factor-authentication').then(response => {
                    return axios.get('/user/two-factor-qr-code').then(response => {
                        setLoading(false);
                        setQrcode(response.data.svg);
                        setStep(1);
                    }).catch(error => {
                        setLoading(false);
                        console.log(error);
                        notify(error?.response?.data?.message);
                    });
                }).catch(error => {
                    setLoading(false);
                    console.log(error);
                    notify(error?.response?.data?.message);
                });
            case 1:
                setLoading(false);
                notify('ra.auth.2fa.success');
                redirect('/profile');
        }
    };

    return (
        <BaseForm>
            <Form onSubmit={submit} render={({ handleSubmit }) => {
                switch (step) {
                    case 0:
                        return (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className={classes.form}>
                                    {translate('ra.auth.2fa.ask')}
                                </div>
                                <CardActions>
                                    <Button variant="contained" type="submit" color="secondary" disabled={loading} className={classes.button} >
                                        {loading && (
                                            <CircularProgress className={classes.icon} size={18} thickness={2} />
                                        )}
                                        {translate('ra.auth.2fa.enable')}
                                    </Button>
                                    <Button variant="contained" onClick={() => { redirect('/profile') }} color="secondary" disabled={loading} className={classes.button} >
                                        {translate('ra.auth.cancel')}
                                    </Button>
                                </CardActions>
                            </form>
                        );
                    case 1:
                        return (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className={classes.form}>
                                    {translate('ra.auth.2fa.scan')}
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1em", marginBottom: "1em" }}>
                                        <div dangerouslySetInnerHTML={{ __html: qrcode }} style={{ border: "8px solid white", width: "208px", height: "208px" }}></div>
                                    </div>
                                </div>
                                <CardActions>
                                    <Button variant="contained" type="submit" color="secondary" disabled={loading} className={classes.button} >
                                        {loading && (
                                            <CircularProgress className={classes.icon} size={18} thickness={2} />
                                        )}
                                        {translate('ra.auth.2fa.validate')}
                                    </Button>
                                </CardActions>
                            </form>
                        );
                }
            }} />
        </BaseForm>
    );
};

export default TwoFactorEnable;