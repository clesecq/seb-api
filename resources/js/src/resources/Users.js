import * as React from "react";
import { AutocompleteArrayInput, BooleanInput, ChipField, Create, Datagrid, DateField, DateInput, Edit, EditButton, List, ListButton, PasswordInput, ReferenceArrayField, ReferenceArrayInput, Resource, Show, ShowButton, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, TopToolbar } from 'react-admin';

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
            <ShowButton />
        </Datagrid>
    </List>
);

const UsersCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const UsersCreate = (props) => (
    <Create {...props} actions={<UsersCreateActions />}>
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

const UsersEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

const UsersEdit = (props) => (
    <Edit {...props} actions={<UsersEditActions />}>
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

const UsersShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);

const UsersShow = (props) => (
    <Show {...props} actions={<UsersShowActions />}>
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
