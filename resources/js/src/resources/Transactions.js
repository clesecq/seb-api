import { useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { AutocompleteInput, BooleanField, BooleanInput, Datagrid, List, ReferenceField, ReferenceInput, ShowButton, SimpleForm, SimpleList, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import { CreateDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";

const TransactionsFilters = [
    <TextInput source="name" />,
    <ReferenceInput source="account_id" reference="accounts" filterToQuery={searchText => ({ name: searchText })}>
        <AutocompleteInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput source="category_id" reference="transactions_categories" filterToQuery={searchText => ({ name: searchText })}>
        <AutocompleteInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput source="user_id" reference="users" filterToQuery={searchText => ({ name: searchText })}>
        <AutocompleteInput optionText="username" />
    </ReferenceInput>
];

const Transactions = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={TransactionsFilters} bulkActionButtons={false}>
                {isDesktop ? (
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
                ) : (
                    <SimpleList
                        primaryText={record => record.name}
                        secondaryText={record => new Date(record.created_at).toLocaleDateString()}
                        tertiaryText={record => <MoneyField record={record} source="amount" noLabel={true} />}
                        linkType="show"
                    />
                )}
            </List>
            <CreateDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput source="name" />
                    <MoneyInput source="amount" />
                    <BooleanInput source="rectification" />
                    <ReferenceInput source="account_id" reference="accounts" filterToQuery={searchText => ({ name: searchText })}>
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                    <ReferenceInput source="category_id" reference="transactions_categories" filterToQuery={searchText => ({ name: searchText })}>
                        <AutocompleteInput optionText="name" />
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
};

export default {
    list: Transactions,
    create: Transactions,
    show: Transactions
};
