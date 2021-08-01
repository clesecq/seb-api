import React from 'react';
import { Edit, PasswordInput, SimpleForm, TextInput } from 'react-admin';

const ProfileEdit = ({ staticContext, ...props }) => {
    return (
        <Edit id="me" resource="profile" basePath="/profile" redirect={false} title="My profile" {...props} >
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="email" />
                <PasswordInput source="password" />
                <PasswordInput source="password_confirmation" />
            </SimpleForm>
        </Edit>
    );
};

export default ProfileEdit;
