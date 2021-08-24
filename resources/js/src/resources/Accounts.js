import * as React from "react";
import { CreateButton, Datagrid, EditButton, ExportButton, FilterButton, List, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";
import { RecalculateButton } from '../components/RecalculateButton';

const AccountsFilters = [
    <TextInput source="name" />,
    <TextInput source="iban" />,
    <TextInput source="bic" />,
];

const AccountsListActions = ({ basePath, ...props }) => (
    <TopToolbar>
        <FilterButton />
        <RecalculateButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const Accounts = (props) => (
    <>
        <List {...props} filters={AccountsFilters} actions={<AccountsListActions />}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="iban" />
                <TextField source="bic" />
                <MoneyField noLabel={true} source="balance" />
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="name" />
                <TextInput source="iban" />
                <TextInput source="bic" />
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <TextInput source="name" />
                <TextInput source="iban" />
                <TextInput source="bic" />
                <MoneyInput disabled source="balance" />
                <DateInput disabled source="created_at" />
                <DateInput disabled source="updated_at" />
            </SimpleForm>
        </EditDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="iban" />
                <TextField source="bic" />
                <MoneyField source="balance" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: Accounts,
    create: Accounts,
    edit: Accounts,
    show: Accounts
};
