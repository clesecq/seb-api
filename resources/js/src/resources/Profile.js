import Grid from '@material-ui/core/Grid';
import { styled } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { spacing } from "@material-ui/system";
import React from 'react';
import { Button, DateField, Edit, Labeled, SaveButton, SimpleForm, TextInput, Toolbar, useRecordContext, useRedirect } from 'react-admin';

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

const TwoFactorAuthField = (props) => {
    const { source } = props;
    const record = useRecordContext(props);
    const redirect = useRedirect();
    return <>
        <StyledGrid container mb={2} alignItems="center">
            <Grid item xs>
                <Labeled label="Two Factor Authentication Status" {...props}>
                    {record[source] ? (
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <DoneIcon />
                            <span style={{ 'margin-left': '8px' }}>Two Factor Authentication is enabled</span>
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
                <StyledButton size="medium" ml="auto" label="Enable 2FA" onClick={() => redirect("/two-factor/enable")}><LockIcon /></StyledButton>
            </Grid>
        </StyledGrid>
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
