import * as React from "react";
import { BooleanField, BooleanInput, Datagrid, DateField, List, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import { CreateDialog, ShowDialog } from '../components/DialogForm';

const TransactionsFilters = [
    <TextInput label="Name" source="name" />,
    <ReferenceInput label="Account" source="account_id" reference="accounts">
        <SelectInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput label="Creator" source="user_id" reference="users">
        <SelectInput optionText="email" />
    </ReferenceInput>
];

const Transactions = (props) => (
    <>
        <List {...props} filters={TransactionsFilters}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <NumberField source="amount" />
                <BooleanField source="rectification" />
                <ReferenceField label="Account" source="account_id" reference="accounts">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Category" source="category_id" reference="transactions_categories">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Creator" source="user_id" reference="users">
                    <TextField source="email" />
                </ReferenceField>
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="name" />
                <NumberInput source="amount" />
                <BooleanInput source="rectification" />
                <ReferenceInput label="Account" source="account_id" reference="accounts">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput label="Category" source="category_id" reference="transactions_categories">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </CreateDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <NumberField source="amount" />
                <BooleanField source="rectification" />
                <ReferenceField label="Account" source="account_id" reference="accounts">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Category" source="category_id" reference="transactions_categories">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Creator" source="user_id" reference="users">
                    <TextField source="email" />
                </ReferenceField>
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: Transactions,
    create: Transactions,
    show: Transactions
};
