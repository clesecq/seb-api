import * as React from "react";
import { CreateButton, Datagrid, DateField, DateInput, EditButton, ExportButton, FilterButton, List, NumberField, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';
import { RecalculateButton } from '../components/RecalculateButton';

const AccountsFilters = [
    <TextInput label="Name" source="name" />,
    <TextInput label="IBAN" source="iban" />,
    <TextInput label="BIC" source="bic" />,
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
                <NumberField source="balance" />
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
                <NumberField source="balance" />
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
