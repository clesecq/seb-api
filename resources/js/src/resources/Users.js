import * as React from "react";
import { AutocompleteArrayInput, BooleanInput, ChipField, Datagrid, EditButton, List, PasswordInput, ReferenceArrayField, ReferenceArrayInput, SimpleForm, SingleFieldList, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog } from '../components/DialogForm';

const UsersFilters = [
    <TextInput label="First Name" source="firstname" />,
    <TextInput label="Last Name" source="lastname" />,
    <TextInput label="Email" source="email" />,
    <BooleanInput label="Payed" source="payed" />
];

const Users = (props) => (
    <>
        <List {...props} filters={UsersFilters}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="username" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="email" />
                <ReferenceArrayField label="Permissions" reference="permissions" source="permissions">
                    <SingleFieldList linkType={false}>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <DateField source="created_at" />
                <DateField source="updated_at" />
                <DateField source="password_changed_at" />
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput  source="username" />
                <PasswordInput  source="password" />
                <TextInput  source="firstname" />
                <TextInput  source="lastname" />
                <TextInput  source="email" />
                <ReferenceArrayInput  label="Permissions" reference="permissions" source="permissions">
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="username" />
                <PasswordInput source="password" />
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <TextInput source="email" />
                <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
                <DateInput disabled source="created_at" />
                <DateInput disabled source="updated_at" />
                <DateInput disabled source="password_changed_at" />
            </SimpleForm>
        </EditDialog>
    </>
);

export default {
    list: Users,
    create: Users,
    edit: Users,
    show: Users
};
