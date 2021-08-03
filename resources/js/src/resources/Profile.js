import { Button as MuiButton, Dialog, DialogActions as MuiDialogActions, DialogContent as MuiDialogContent, DialogTitle, Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { styled } from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SecurityIcon from '@material-ui/icons/Security';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { spacing } from "@material-ui/system";
import React, { useState } from 'react';
import { Button, DateField, Edit, Labeled, SaveButton, SimpleForm, TextInput, Toolbar, useNotify, useRecordContext, useRedirect, useRefresh, useUpdateLoading } from 'react-admin';
const StyledButton = styled(Button)(spacing);
const StyledGrid = styled(Grid)(spacing);

const ChangePasswordField = (props) => {
    const { source } = props;
    const record = useRecordContext(props);
    const redirect = useRedirect();
    return <>
        <StyledGrid container mb={2} alignItems="center">
            <Grid item xs>
                <Labeled label="Last password change" {...props}>
                    <DateField {...props} />
                </Labeled>
            </Grid>
            <Grid item>
                <StyledButton size="medium" ml="auto" label="Change password" onClick={() => redirect("/change-password")}><VpnKeyIcon /></StyledButton>
            </Grid>
        </StyledGrid>
    </>;
};


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const MyDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" style={{ marginTop: '1rem', marginBottom: '1rem' }}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const TwoFactorAuthField = (props) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const { source } = props;
    const record = useRecordContext(props);
    const redirect = useRedirect();
    const [open, setOpen] = useState(false);
    const [codes, setCodes] = useState([]);
    const { startLoading, stopLoading } = useUpdateLoading();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <StyledGrid container mb={2} alignItems="center">
            <Grid item xs>
                <Labeled label="Two Factor Authentication Status" {...props}>
                    {record[source] ? (
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <DoneIcon />
                            <span style={{ marginLeft: '8px' }}>Two Factor Authentication is enabled</span>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <ClearIcon />
                            <span style={{ marginLeft: '8px' }}>Two Factor Authentication is disabled</span>
                        </div>
                    )}
                </Labeled>
            </Grid>
            <Grid item>
                {record[source] ? (<>
                    <StyledButton size="medium" ml="auto" label="Disable 2FA" onClick={() => redirect("/two-factor/disable")}><LockOpenIcon /></StyledButton>
                    <StyledButton size="medium" ml="auto" label="Recovery Codes" onClick={() => {
                        startLoading();
                        return axios.get('/user/two-factor-recovery-codes').then(response => {
                            stopLoading();
                            setCodes(response.data);
                            handleClickOpen();
                        }).catch(error => {
                            stopLoading();
                            console.log(error);
                            notify(error?.response?.data?.message);
                        });
                    }}><SecurityIcon /></StyledButton>
                </>) : (
                    <StyledButton size="medium" ml="auto" label="Enable 2FA" onClick={() => redirect("/two-factor/enable")}><LockIcon /></StyledButton>
                )}
            </Grid>
        </StyledGrid>
        {record[source] ?
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <MyDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Two Factor Authentication Recovery Codes
                </MyDialogTitle>
                <DialogContent>
                    <Typography gutterBottom style={{ marginBottom: '16px' }}>
                        These codes will help you recover your account if you lose your 2FA device. Please
                        keep them carefully.
                    </Typography>
                    {codes.map((code, key) => (
                        <Typography style={{ fontFamily: 'monospace', textAlign: 'center' }} gutterBottom key={key}>
                            {code}
                        </Typography>
                    ))}
                </DialogContent>
                <DialogActions>
                    <MuiButton autoFocus onClick={() => {
                        startLoading();
                        return axios.post('/user/two-factor-recovery-codes').then(response => {
                            return axios.get('/user/two-factor-recovery-codes').then(response => {
                                stopLoading();
                                setCodes(response.data);
                            }).catch(error => {
                                stopLoading();
                                console.log(error);
                                notify(error?.response?.data?.message);
                            });
                        }).catch(error => {
                            stopLoading();
                            console.log(error);
                            notify(error?.response?.data?.message);
                        });
                    }} color="primary">
                        Regen
                    </MuiButton>
                    <MuiButton autoFocus onClick={handleClose} color="primary">
                        Close
                    </MuiButton>
                </DialogActions>
            </Dialog> : ""
        }
    </>;
};

const ProfileEditToolbar = (props) => {

    return (
        <Toolbar {...props} >
            <SaveButton disabled={props.pristine} color="secondary" />
        </Toolbar>
    );
};

const ProfileEdit = ({ staticContext, ...props }) => {
    return (
        <Edit height={1} id="me" resource="profile" basePath="/profile" redirect={false} title="My profile" {...props} >
            <SimpleForm redirect={false} toolbar={<ProfileEditToolbar />}>
                <><Typography variant="h5" component="h2">Profile</Typography></>
                <TextInput source="username" />
                <>{((props) => (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="firstname" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="lastname" />
                        </Grid>
                    </Grid>
                ))()}</>
                <TextInput source="email" />
                <><Typography variant="h5" component="h2">Password</Typography></>
                <ChangePasswordField source="password_changed_at" />
                <><Typography variant="h5" component="h2">Two factor Authentication</Typography></>
                <TwoFactorAuthField source="two_factor" />
            </SimpleForm>
        </Edit>
    );
};

export default ProfileEdit;
