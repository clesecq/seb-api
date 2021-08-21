import * as React from "react";
import { BooleanField, BooleanInput, Datagrid, DateField, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import { CreateDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";

const TransactionsFilters = [
    <TextInput source="name" />,
    <ReferenceInput source="account_id" reference="accounts">
        <SelectInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput source="user_id" reference="users">
        <SelectInput optionText="username" />
    </ReferenceInput>
];

const Transactions = (props) => (
    <>
        <List {...props} filters={TransactionsFilters} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <MoneyField noLabel={true} source="amount" />
                <BooleanField source="rectification" />
                <ReferenceField source="account_id" reference="accounts">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="category_id" reference="transactions_categories">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="user_id" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="name" />
                <MoneyInput source="amount" />
                <BooleanInput source="rectification" />
                <ReferenceInput source="account_id" reference="accounts">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="category_id" reference="transactions_categories">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </CreateDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <MoneyField source="amount" />
                <BooleanField source="rectification" />
                <ReferenceField source="account_id" reference="accounts">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="category_id" reference="transactions_categories">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="user_id" reference="users">
                    <TextField source="username" />
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
