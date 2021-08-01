import * as React from "react";
import { AutocompleteArrayInput, BooleanInput, ChipField, Datagrid, DateField, DateInput, PasswordInput, ReferenceArrayField, ReferenceArrayInput, Resource, ShowButton, SingleFieldList, TextField, TextInput } from 'react-admin';
import { ModalFormCreate, ModalFormEdit, ModalFormShow, ModalList } from '../components/ModalForm';

const UsersFilters = [
    <TextInput label="First Name" source="firstname" />,
    <TextInput label="Last Name" source="lastname" />,
    <TextInput label="Email" source="email" />,
    <TextInput label="Card" source="card" />,
    <BooleanInput label="Payed" source="payed" />
];

const UsersList = (props) => (
    <ModalList {...props} filters={UsersFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <ReferenceArrayField label="Permissions" reference="permissions" source="permissions">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <ShowButton />
        </Datagrid>
    </ModalList>
);

const UsersCreate = (props) => (
    <ModalFormCreate {...props}>
        <TextInput source="name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
            <AutocompleteArrayInput />
        </ReferenceArrayInput>
    </ModalFormCreate>
);

const UsersEdit = (props) => (
    <ModalFormEdit {...props}>·
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="email" />
        <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
            <AutocompleteArrayInput />
        </ReferenceArrayInput>
        <DateInput disabled source="created_at" />
        <DateInput disabled source="updated_at" />
    </ModalFormEdit>
);

const UsersShow = (props) => (
    <ModalFormShow {...props}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="email" />
        <ReferenceArrayField label="Permissions" reference="permissions" source="permissions">
            <SingleFieldList>
                <ChipField source="name" />
            </SingleFieldList>
        </ReferenceArrayField>
        <DateField source="created_at" />
        <DateField source="updated_at" />
    </ModalFormShow>
);

export default (
    <Resource name="users" list={UsersList} show={UsersShow} create={UsersCreate} edit={UsersEdit} />
);
