import * as React from "react";
import { Datagrid, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, SimpleShowLayout, TextField } from 'react-admin';
import DateField from '../components/DateField';
import { CreateDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";

const Transferts = (props) => (
    <>
        <List {...props} bulkActionButtons={false}>
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
                    <TextField source="username" />
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
                    <TextField source="username" />
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
