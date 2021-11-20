import { useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { AutocompleteInput, BooleanField, BooleanInput, Datagrid, DateInput, EditButton, List, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectField, SelectInput, SimpleForm, SimpleList, SimpleShowLayout, TextField, TextInput, useTranslate } from 'react-admin';
import DateField from '../components/DateField';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";

const AutomatedTransactionsFilters = [
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

const AutomatedTransactions = (props) => {
    const translate = useTranslate();

    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));

    const l = {
        yearly: "année",
        monthly: "mois",
        weekly: "semaine"
    }

    return (
        <>
            <List {...props} filters={AutomatedTransactionsFilters}>
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
                    <SelectField source="frequency" choices={[
                        { id: 'yearly', name: translate('resources.automated_transactions.frequencies.yearly') },
                        { id: 'monthly', name: translate('resources.automated_transactions.frequencies.monthly') },
                        { id: 'weekly', name: translate('resources.automated_transactions.frequencies.weekly') },
                        { id: 'dayly', name: translate('resources.automated_transactions.frequencies.dayly') }
                    ]} />
                    <NumberField source="day" />
                    <DateField source="created_at" />
                    <EditButton />
                </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record => record.name}
                        tertiaryText={record => Number(record.amount).toLocaleString('fr-FR', { currency: "EUR", currencyDisplay: 'symbol', style: 'currency' })}
                        secondaryText={record => record.frequency === 'dayly' ? 'Tous les jours' : `Le ${record.day} de chaque ${l[record.frequency]}`}
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
                    <SelectInput source="frequency" choices={[
                        { id: 'yearly', name: translate('resources.automated_transactions.frequencies.yearly') },
                        { id: 'monthly', name: translate('resources.automated_transactions.frequencies.monthly') },
                        { id: 'weekly', name: translate('resources.automated_transactions.frequencies.weekly') },
                        { id: 'dayly', name: translate('resources.automated_transactions.frequencies.dayly') }
                    ]} />
                    <NumberInput source="day" />
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
                    <SelectField source="frequency" choices={[
                        { id: 'yearly', name: translate('resources.automated_transactions.frequencies.yearly') },
                        { id: 'monthly', name: translate('resources.automated_transactions.frequencies.monthly') },
                        { id: 'weekly', name: translate('resources.automated_transactions.frequencies.weekly') },
                        { id: 'dayly', name: translate('resources.automated_transactions.frequencies.dayly') }
                    ]} />
                    <NumberField source="day" />
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </SimpleShowLayout>
            </ShowDialog>
            <EditDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput disabled source="id" />
                    <TextInput source="name" />
                    <MoneyInput source="amount" />
                    <BooleanInput source="rectification" />
                    <ReferenceInput source="account_id" reference="accounts" filterToQuery={searchText => ({ name: searchText })}>
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                    <ReferenceInput source="category_id" reference="transactions_categories" filterToQuery={searchText => ({ name: searchText })}>
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                    <SelectInput source="frequency" choices={[
                        { id: 'yearly', name: translate('resources.automated_transactions.frequencies.yearly') },
                        { id: 'monthly', name: translate('resources.automated_transactions.frequencies.monthly') },
                        { id: 'weekly', name: translate('resources.automated_transactions.frequencies.weekly') },
                        { id: 'dayly', name: translate('resources.automated_transactions.frequencies.dayly') }
                    ]} />
                    <NumberInput source="day" />
                    <DateInput disabled source="created_at" />
                    <DateInput disabled source="updated_at" />
                </SimpleForm>
            </EditDialog>
        </>
    );
};

export default {
    list: AutomatedTransactions,
    create: AutomatedTransactions,
    show: AutomatedTransactions,
    edit: AutomatedTransactions
};
