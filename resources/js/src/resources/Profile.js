import { styled } from "@material-ui/core/styles";
import LockIcon from '@material-ui/icons/Lock';
import { spacing } from "@material-ui/system";
import React from 'react';
import { Button, Edit, SaveButton, SimpleForm, TextInput, Toolbar, useRedirect } from 'react-admin';

const StyledButton = styled(Button)(spacing);

const ProfileEditToolbar = (props) => {
    const redirect = useRedirect();
    
    return (
        <Toolbar {...props} >
            <SaveButton disabled={props.pristine} color="secondary" />
            <StyledButton size="medium" ml="auto" label="Change password" onClick={() => redirect("/change-password")}><LockIcon /></StyledButton>
        </Toolbar>
    );
};

const ProfileEdit = ({ staticContext, ...props }) => {
    return (
        <Edit height={1} id="me" resource="profile" basePath="/profile" redirect={false} title="My profile" {...props} >
            <SimpleForm redirect={false} toolbar={<ProfileEditToolbar />}>
                <TextInput source="name" />
                <TextInput source="email" />
            </SimpleForm>
        </Edit>
    );
};

export default ProfileEdit;
