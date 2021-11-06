import * as React from "react";
import { AutocompleteInput, Datagrid, List, ReferenceField, ReferenceInput, ShowButton, SimpleShowLayout, TextField } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";

const PersonalTransactionsFilters = [
    <ReferenceInput source="personal_account_id" reference="personal_accounts" filterToQuery={searchText => ({ fullname: searchText })}>
        <AutocompleteInput optionText="person.fullname" />
    </ReferenceInput>,
    <ReferenceInput source="user_id" reference="users" filterToQuery={searchText => ({ username: searchText })}>
        <AutocompleteInput optionText="username" />
    </ReferenceInput>
];

const PersonalTransactions = (props) => (
    <>
        <List {...props} filters={PersonalTransactionsFilters} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="id" />
                <MoneyField noLabel={true} source="amount" />
                <ReferenceField source="personal_account_id" reference="personal_accounts">
                    <TextField source="person.fullname" />
                </ReferenceField>
                <ReferenceField source="user_id" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <MoneyField source="amount" />
                <ReferenceField source="personal_account_id" reference="personal_accounts" link="show">
                    <TextField source="person.fullname" />
                </ReferenceField>
                <ReferenceField source="user_id" reference="users" link="show">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: PersonalTransactions,
    show: PersonalTransactions
};
