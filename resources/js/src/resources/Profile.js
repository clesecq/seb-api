import Grid from '@material-ui/core/Grid';
import { styled } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
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
                <StyledButton size="medium" ml="auto" label="Change password" onClick={() => redirect("/change-password")}><LockIcon /></StyledButton>
            </Grid>
        </StyledGrid>
    </>;
}

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
                <TextInput source="name" />
                <TextInput source="email" />
                <><Typography variant="h5" component="h2">Password</Typography></>
                <ChangePasswordField source="password_changed_at" />
                <><Typography variant="h5" component="h2">Two factor Authentication</Typography></>
            </SimpleForm>
        </Edit>
    );
};

export default ProfileEdit;
