import * as React from "react";
import { Create, Datagrid, DateField, DateInput, Edit, EditButton, List, NumberField, Resource, Show, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';

const AccountsFilters = [
    <TextInput label="Name" source="name" />,
    <TextInput label="IBAN" source="iban" />,
    <TextInput label="BIC" source="bic" />,
];

const AccountsList = (props) => (
    <List {...props} filters={AccountsFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="iban" />
            <TextField source="bic" />
            <NumberField source="balance" />
            <EditButton />
        </Datagrid>
    </List>
);
 

const AccountsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="iban" />
            <TextInput source="bic" />
        </SimpleForm>
    </Create>
);

const AccountsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="iban" />
            <TextInput source="bic" />
            <DateInput disabled source="created_at" />
            <DateInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);

const AccountsShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="iban" />
            <TextField source="bic" />
            <NumberField source="balance" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);

export default  (
    <Resource name="accounts" list={AccountsList} show={AccountsShow} create={AccountsCreate} edit={AccountsEdit} />
);
