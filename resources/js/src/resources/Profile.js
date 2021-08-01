import React from 'react';
import { Edit, PasswordInput, SaveButton, SimpleForm, TextInput, Toolbar } from 'react-admin';

const ProfileEdit = ({ staticContext, ...props }) => {
    return (
        <Edit id="me" resource="profile" basePath="/profile" redirect={false} title="My profile" {...props} >
            <SimpleForm redirect={false} toolbar={<Toolbar {...props} ><SaveButton disabled={props.pristine} color="secondary" /></Toolbar>}>
                <TextInput source="name" />
                <TextInput source="email" />
                <PasswordInput source="password" />
                <PasswordInput source="password_confirmation" />
            </SimpleForm>
        </Edit>
    );
};

export default ProfileEdit;
