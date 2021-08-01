import * as React from "react";
import { BooleanField, BooleanInput, Create, Datagrid, DateField, List, ListButton, NumberField, NumberInput, ReferenceField, ReferenceInput, Resource, SelectInput, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';

const TransactionsFilters = [
    <TextInput label="Name" source="name" />,
    <ReferenceInput label="Account"source="account_id" reference="accounts">
        <SelectInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput label="Creator" source="user_id" reference="users">
        <SelectInput optionText="email" />
    </ReferenceInput>
];

const TransactionsList = (props) => (
    <List {...props} filters={TransactionsFilters} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <NumberField source="amount" />
            <BooleanField source="rectification" />
            <ReferenceField label="Account" source="account_id" reference="accounts">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Creator" source="user_id" reference="users">
                <TextField source="email" />
            </ReferenceField>
            <DateField source="created_at" />
            <ShowButton />
        </Datagrid>
    </List>
);

const TransactionsCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const TransactionsCreate = (props) => (
    <Create {...props} actions={<TransactionsCreateActions />}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput source="amount" />
            <BooleanInput source="rectification" />
            <ReferenceInput label="Account"source="account_id" reference="accounts">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

const TransactionShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const TransactionsShow = (props) => (
    <Show {...props} actions={<TransactionShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <NumberField source="amount" />
            <BooleanField source="rectification" />
            <ReferenceField label="Account" source="account_id" reference="accounts">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Creator" source="user_id" reference="users">
                <TextField source="email" />
            </ReferenceField>
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);

export default  (
    <Resource name="transactions" list={TransactionsList} show={TransactionsShow} create={TransactionsCreate} />
);
