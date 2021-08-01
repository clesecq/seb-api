import * as React from "react";
import { AutocompleteArrayInput, BooleanInput, ChipField, Datagrid, DateField, DateInput, EditButton, List, PasswordInput, ReferenceArrayField, ReferenceArrayInput, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput } from 'react-admin';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const UsersFilters = [
    <TextInput label="First Name" source="firstname" />,
    <TextInput label="Last Name" source="lastname" />,
    <TextInput label="Email" source="email" />,
    <TextInput label="Card" source="card" />,
    <BooleanInput label="Payed" source="payed" />
];

const Users = (props) => (
    <>
        <List {...props} filters={UsersFilters}>
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
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="name" />
                <TextInput source="email" />
                <PasswordInput source="password" />
                <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <TextInput source="name" />
                <TextInput source="email" />
                <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
                    <AutocompleteArrayInput />
                </ReferenceArrayInput>
                <DateInput disabled source="created_at" />
                <DateInput disabled source="updated_at" />
            </SimpleForm>
        </EditDialog>
        <ShowDialog>
            <SimpleShowLayout>
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
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: Users,
    create: Users,
    edit: Users,
    show: Users
};
