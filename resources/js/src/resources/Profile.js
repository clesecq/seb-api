import { Button as MuiButton, Dialog, DialogActions as MuiDialogActions, DialogContent as MuiDialogContent, DialogTitle, Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { makeStyles, styled } from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SecurityIcon from '@material-ui/icons/Security';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { spacing } from "@material-ui/system";
import React, { useState } from 'react';
import { ArrayField, Button, ChipField, Datagrid, Edit, Labeled, ReferenceArrayField, SaveButton, SimpleForm, SingleFieldList, TextField, TextInput, Toolbar, useAuthProvider, useDeleteWithConfirmController, useNotify, useRecordContext, useRedirect, useRefresh, useTranslate, useUpdateLoading } from 'react-admin';
import DateField from '../components/DateField';
const StyledButton = styled(Button)(spacing);
const StyledGrid = styled(Grid)(spacing);

const ChangePasswordField = (props) => {
    const { source } = props;
    const record = useRecordContext(props);
    const redirect = useRedirect();
    const translate = useTranslate();
    return <>
        <StyledGrid container mb={2} alignItems="center">
            <Grid item xs>
                {record[source] !== null ?
                    <Labeled label={translate('resources.profile.password.last_change')} {...props}>
                        <DateField {...props} />
                    </Labeled>
                    :
                    <Labeled label={translate('resources.profile.password.last_change')} {...props}>
                        <><Typography component="span" variant="body2">{translate('resources.profile.password.never')}</Typography></>
                    </Labeled>
                }
            </Grid>
            <Grid item>
                <StyledButton size="medium" ml="auto" label={translate('resources.profile.password.change')} onClick={() => redirect("/change-password")}><VpnKeyIcon /></StyledButton>
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
    const classes = useStyles(props);
    const refresh = useRefresh();
    const notify = useNotify();
    const { source } = props;
    const record = useRecordContext(props);
    const redirect = useRedirect();
    const [open, setOpen] = useState(false);
    const [codes, setCodes] = useState([]);
    const { startLoading, stopLoading } = useUpdateLoading();
    const translate = useTranslate();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <StyledGrid container mb={2} alignItems="center">
            <Grid item xs>
                <Labeled label={translate('resources.profile.2fa.status')} {...props}>
                    {record[source] ? (
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <DoneIcon />
                            <span style={{ marginLeft: '8px' }}>{translate('resources.profile.2fa.enabled')}</span>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <ClearIcon />
                            <span style={{ marginLeft: '8px' }}>{translate('resources.profile.2fa.disabled')}</span>
                        </div>
                    )}
                </Labeled>
            </Grid>
            <Grid item>
                {record[source] ? (<>
                    <StyledButton size="medium" ml="auto" label={translate('resources.profile.2fa.recovery')} onClick={() => {
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
                    <StyledButton className={classes.deleteButton} size="medium" ml="auto" label={translate('resources.profile.2fa.disable')} onClick={() => redirect("/two-factor/disable")}><LockOpenIcon /></StyledButton>
                </>) : (
                    <StyledButton size="medium" ml="auto" label={translate('resources.profile.2fa.enable')} onClick={() => redirect("/two-factor/enable")}><LockIcon /></StyledButton>
                )}
            </Grid>
        </StyledGrid>
        {record[source] ?
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <MyDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {translate('resources.profile.2fa.recovery')}
                </MyDialogTitle>
                <DialogContent>
                    <Typography gutterBottom style={{ marginBottom: '16px' }}>
                        {translate('resources.profile.2fa.recovery_message')}
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

const useStyles = makeStyles(
    theme => ({
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }),
    { name: 'RaDeleteWithUndoButton' }
);

const TokenField = ({ onClick, ...props }) => {
    const { source } = props;
    const classes = useStyles(props);
    const record = useRecordContext(props);
    const translate = useTranslate();

    
    const { loading, handleDelete } = useDeleteWithConfirmController({
        resource: "tokens",
        record: record,
        basePath: "profile",
        mutationMode: "pessimistic"
    });
    return (
        <>
            <div style={{ width: '100%', display: 'flex', alignItems: 'end' }}>
                <StyledButton size="medium" ml="auto" className={classes.deleteButton} label={translate('ra.action.delete')} onClick={handleDelete} disabled={loading}>
                    <ClearIcon />
                </StyledButton>
            </div>
        </>
    );
};

const TokensField = (props) => {
    const redirect = useRedirect();
    const classes = useStyles(props);
    const translate = useTranslate();

    return (<>
        <StyledGrid container mb={2} alignItems="center">
            <Grid item xs>
                <Typography variant="h5" component="h2">{translate('resources.profile.tokens.title')}</Typography>
            </Grid>
            <Grid item>
                <StyledButton size="medium" ml="auto" label={translate('resources.profile.tokens.new')} onClick={() => redirect("/tokens/create")}><AddIcon /></StyledButton>
                <StyledButton className={classes.deleteButton} size="medium" ml="auto" label={translate('resources.profile.tokens.clear')} onClick={() => redirect("/tokens/clear")}><ClearIcon /></StyledButton>
            </Grid>
        </StyledGrid>
        <>
            {props.record.tokens.length == 0 ? <Typography>{translate('resources.profile.tokens.none')}</Typography> :
                <ArrayField source="tokens" {...props}>
                    <Datagrid>
                        <TextField source="id" label={translate('resources.profile.tokens.id')} />
                        <TextField source="name" label={translate('resources.profile.tokens.name')} />
                        <DateField source="last_used_at" label={translate('resources.profile.tokens.last_used_at')} />
                        <DateField source="created_at" label={translate('resources.profile.tokens.created_at')} />
                        <TokenField source="id" label="" />
                    </Datagrid>
                </ArrayField>
            }
        </>
    </>);
};


const ProfileEditToolbar = (props) => {

    return (
        <Toolbar {...props} >
            <SaveButton disabled={props.pristine} color="secondary" />
        </Toolbar>
    );
};

const ProfileEdit = ({ staticContext, ...props }) => {
    const translate = useTranslate();
    const notify = useNotify();
    const authProvider = useAuthProvider();
    const refresh = useRefresh();

    const onSuccess = ({ data }) => {
        notify('ra.notification.updated', 'info', { smart_count: 1 }, false);
        document.dispatchEvent(new CustomEvent('profileUpdated', { detail: data }));
        authProvider.updateEmail(data.email);
        refresh();
    };

    return (
        <Edit onSuccess={onSuccess} mutationMode="pessimistic" height={1} id="me" resource="profile" basePath="/profile" redirect={false} title={translate('resources.profile.me')} {...props} >
            <SimpleForm redirect={false} toolbar={<ProfileEditToolbar />}>
                <><Typography variant="h5" component="h2">{translate('resources.profile.name')}</Typography></>
                <TextInput source="username" />
                <>{((props) => (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="firstname" label={translate('resources.profile.fields.firstname')} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="lastname" label={translate('resources.profile.fields.lastname')} />
                        </Grid>
                    </Grid>
                ))()}</>
                <TextInput source="email" />
                <><Typography variant="h5" component="h2">{translate('resources.profile.permissions.title')}</Typography></>
                <><ReferenceArrayField reference="permissions" source="permissions" style={{ marginBottom: '2px', marginTop: '2px' }}>
                    <SingleFieldList linkType={false}>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField></>
                <><Typography variant="h5" component="h2">{translate('resources.profile.password.title')}</Typography></>
                <ChangePasswordField source="password_changed_at" />
                <><Typography variant="h5" component="h2">{translate('resources.profile.2fa.title')}</Typography></>
                <TwoFactorAuthField source="two_factor" />
                <TokensField />
            </SimpleForm>
        </Edit>
    );
};

export default ProfileEdit;
