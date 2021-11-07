import { TextField as MuiTextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import React, { useEffect, useState } from "react";
import { Labeled, Loading, useInput, useMutation, useNotify } from 'react-admin';
import QrReader from 'react-qr-reader';

const PersonalAccountSelector = ({ label, ...props }) => {
    const { input: { name, onChange, value, ...rest }, meta: { touched, error }, isRequired } = useInput(props);

    const [load_account, { loading, data, error: query_error }] = useMutation({
        type: 'getOne',
        resource: 'personal_accounts',
        payload: { id: value }
    });

    useEffect(() => {
        if (value !== "")
            load_account();
    }, [value]);

    const notify = useNotify();
    useEffect(() => {
        if (query_error)
            notify('ra.notification.item_doesnt_exist', 'error');
    }, [query_error]);

    const [scanning, setScanning] = useState(false);

    const scanClicked = () => {
        setScanning(!scanning);
    };
    const onScan = (data) => {
        if (data) {
            let s = data.toString().match("http:\/\/esc\.gg\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}).*");
            if (s !== null) {
                onChange(s[1]);
                setScanning(false);
            }
        }
    };

    return (
        <>
            <Labeled label={label}>
                <Grid container spacing={3}>
                    <Grid item md>
                        <MuiTextField
                            disabled
                            name={name}
                            onChange={onChange}
                            error={!!(touched && error)}
                            helperText={touched && error}
                            required={isRequired}
                            value={value}
                            {...rest}
                        />
                    </Grid>
                    <Grid item container md={2} style={{ justifyContent: "flex-end" }}>
                        <Grid item>
                            <Button fullWidth variant="contained" endIcon={<PhotoCameraIcon />} color="primary" onClick={scanClicked}>
                                Scan
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Labeled>
            {scanning ? (
                <QrReader delay={200} style={{ width: '100%' }} onScan={onScan} onError={console.error} />
            ) : ""}

            {loading ? (
                <Loading />
            ) : (data === undefined || data === null ? "" : (<>
                <Labeled label="Nom">
                    <MuiTextField
                        disabled
                        value={data.person.fullname}
                    />
                </Labeled>
                <Labeled label="Solde">
                    <MuiTextField
                        disabled
                        value={Number(data.balance).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })}
                    />
                </Labeled>
            </>)
            )}
        </>
    );
}

export default PersonalAccountSelector;