
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useState } from 'react';
import { Labeled, useInput } from 'react-admin';
import QrReader from 'react-qr-reader';

const QRInput = ({ label, regexp, ...props }) => {
    const { input: { name, onChange, value, ...rest }, meta: { touched, error }, isRequired } = useInput(props);

    const [scanning, setScanning] = useState(false);

    const scanClicked = () => {
        setScanning(!scanning);
    };
    const onScan = (data) => {
        if (data) {
            let s = data.toString().match(regexp);
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
                        <TextField
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
        </>
    );
}
export default QRInput;