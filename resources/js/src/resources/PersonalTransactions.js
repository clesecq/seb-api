import { useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { AutocompleteInput, Datagrid, List, ReferenceField, ReferenceInput, ShowButton, SimpleList, SimpleShowLayout, TextField } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";

const PersonalTransactionsFilters = [
    <ReferenceInput source="personal_account_id" reference="personal_accounts">
        <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText })}>
            <AutocompleteInput optionText="fullname" />
        </ReferenceInput>
    </ReferenceInput>,
    <ReferenceInput source="user_id" reference="users" filterToQuery={searchText => ({ username: searchText })}>
        <AutocompleteInput optionText="username" />
    </ReferenceInput>
];

const PersonalTransactions = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={PersonalTransactionsFilters} bulkActionButtons={false}>
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <MoneyField noLabel={true} source="amount" />
                        <ReferenceField source="transaction_id" reference="transactions" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField source="personal_account_id" reference="personal_accounts" link={false}>
                            <ReferenceField source="person_id" reference="people" link="show">
                                <TextField source="fullname" />
                            </ReferenceField>
                        </ReferenceField>
                        <ReferenceField source="user_id" reference="users">
                            <TextField source="username" />
                        </ReferenceField>
                        <DateField source="created_at" />
                        <ShowButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record =>
                            <ReferenceField record={record} source="transaction_id" reference="transactions" link={false} >
                                <TextField source="name" />
                            </ReferenceField>}
                        secondaryText={record =>
                            <ReferenceField record={record} source="personal_account_id" reference="personal_accounts">
                                <ReferenceField source="person_id" reference="people" link={false}>
                                    <TextField source="fullname" />
                                </ReferenceField>
                            </ReferenceField>}
                        tertiaryText={record => Number(record.amount).toLocaleString('fr-FR', { currency: "EUR", currencyDisplay: 'symbol', style: 'currency' })}
                        linkType="show"
                    />
                )}
            </List>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <MoneyField source="amount" />
                    <ReferenceField source="personal_account_id" reference="personal_accounts">
                        <ReferenceField source="person_id" reference="people" link="show">
                            <TextField source="fullname" />
                        </ReferenceField>
                    </ReferenceField>
                    <ReferenceField source="transaction_id" reference="transactions" link="show">
                        <TextField source="name" />
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
};

export default {
    list: PersonalTransactions,
    show: PersonalTransactions
};
