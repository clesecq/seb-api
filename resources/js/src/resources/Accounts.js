import * as React from "react";
import { CreateButton, Datagrid, DateField, DateInput, EditButton, ExportButton, FilterButton, NumberField, Resource, TextField, TextInput, TopToolbar } from 'react-admin';
import { ModalFormCreate, ModalFormEdit, ModalFormShow, ModalList } from '../components/ModalForm';
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

const AccountsCreate = (props) => (
    <ModalFormCreate {...props}>
        <TextInput source="name" />
        <TextInput source="iban" />
        <TextInput source="bic" />
    </ModalFormCreate>
);

const AccountsEdit = (props) => (
    <ModalFormEdit {...props}>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="iban" />
        <TextInput source="bic" />
        <DateInput disabled source="created_at" />
        <DateInput disabled source="updated_at" />
    </ModalFormEdit>
);

const AccountsShow = (props) => (
    <ModalFormShow {...props} >
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="iban" />
        <TextField source="bic" />
        <NumberField source="balance" />
        <DateField source="created_at" />
        <DateField source="updated_at" />
    </ModalFormShow>
);

const AccountsList = (props) => (
    <ModalList {...props} show={AccountsShow} edit={AccountsEdit} create={AccountsCreate} filters={AccountsFilters} actions={<AccountsListActions />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="iban" />
            <TextField source="bic" />
            <NumberField source="balance" />
            <EditButton />
        </Datagrid>
    </ModalList>
);

export default (
    <Resource name="accounts" list={AccountsList} />
);
