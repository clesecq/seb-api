import * as React from "react";
import { BooleanField, BooleanInput, Datagrid, DateField, NumberField, NumberInput, ReferenceField, ReferenceInput, Resource, SelectInput, ShowButton, TextField, TextInput } from 'react-admin';
import { ModalFormCreate, ModalFormShow, ModalList } from '../components/ModalForm';

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
    <ModalList {...props} filters={TransactionsFilters} bulkActionButtons={false}  show={TransactionsShow} create={TransactionsCreate}>
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
    </ModalList>
);

const TransactionsCreate = (props) => (
    <ModalFormCreate {...props}>
        <TextInput source="name" />
        <NumberInput source="amount" />
        <BooleanInput source="rectification" />
        <ReferenceInput label="Account"source="account_id" reference="accounts">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </ModalFormCreate>
);

const TransactionsShow = (props) => (
    <ModalFormShow {...props}>
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
    </ModalFormShow>
);

export default  (
    <Resource name="transactions" list={TransactionsList} />
);
