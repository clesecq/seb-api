import * as React from "react";
import { AutocompleteArrayInput, BooleanInput, ChipField, Create, Datagrid, DateField, DateInput, Edit, EditButton, List, PasswordInput, ReferenceArrayField, ReferenceArrayInput, Resource, Show, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput } from 'react-admin';

const UsersFilters = [
    <TextInput label="First Name" source="firstname" />,
    <TextInput label="Last Name" source="lastname" />,
    <TextInput label="Email" source="email" />,
    <TextInput label="Card" source="card" />,
    <BooleanInput label="Payed" source="payed" />
];

const UsersList = (props) => (
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
);
const UsersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <PasswordInput source="password" />
            <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
                <AutocompleteArrayInput />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);

const UsersEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="email" />
            <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
                <AutocompleteArrayInput />
            </ReferenceArrayInput>
            <DateInput disabled source="created_at" />
            <DateInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);

const UsersShow = (props) => (
    <Show {...props}>
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
    </Show>
);

export default  (
    <Resource name="users" list={UsersList} show={UsersShow} create={UsersCreate} edit={UsersEdit} />
);
