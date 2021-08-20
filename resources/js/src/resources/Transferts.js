import * as React from "react";
import { Datagrid, DateField, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import { CreateDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";

const TransfertsFilters = [
    <TextInput source="name" />,
    <ReferenceInput source="account_id" reference="accounts">
        <SelectInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput source="user_id" reference="users">
        <SelectInput optionText="email" />
    </ReferenceInput>
];

const Transferts = (props) => (
    <>
        <List {...props} filters={TransfertsFilters} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField source="sub_transaction.account_id" reference="accounts">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="add_transaction.account_id" reference="accounts">
                    <TextField source="name" />
                </ReferenceField>
                <MoneyField noLabel={true} source="add_transaction.amount" />
                <ReferenceField source="sub_transaction.user_id" reference="users">
                    <TextField source="email" />
                </ReferenceField>
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <MoneyInput source="amount" />
                <ReferenceInput source="from_account_id" reference="accounts">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="to_account_id" reference="accounts">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </CreateDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <ReferenceField source="sub_transaction.account_id" reference="accounts">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="sub_transaction_id" reference="transactions">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="add_transaction.account_id" reference="accounts">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="add_transaction_id" reference="transactions">
                    <TextField source="name" />
                </ReferenceField>
                <MoneyField source="add_transaction.amount" />
                <ReferenceField source="sub_transaction.user_id" reference="users">
                    <TextField source="email" />
                </ReferenceField>
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: Transferts,
    create: Transferts,
    show: Transferts
};
