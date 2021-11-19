import * as React from "react";
import { AutocompleteInput, Datagrid, List, ReferenceField, ReferenceInput, ShowButton, SimpleForm, SimpleShowLayout, TextField } from 'react-admin';
import DateField from '../components/DateField';
import { CreateDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";

const Transferts = (props) => (
    <>
        <List {...props} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField label="Depuis" source="sub_transaction_id" reference="transactions" link="show">
                    <ReferenceField source="account_id" reference="accounts">
                        <TextField source="name" />
                    </ReferenceField>
                </ReferenceField>
                <ReferenceField label="Vers" source="add_transaction_id" reference="transactions" link="show">
                    <ReferenceField source="account_id" reference="accounts">
                        <TextField source="name" />
                    </ReferenceField>
                </ReferenceField>
                <ReferenceField label="Montant" source="add_transaction_id" reference="transactions" link="show">
                    <MoneyField source="amount" noLabel={true} />
                </ReferenceField>
                <ReferenceField label="Créateur" source="add_transaction_id" reference="transactions" link="show">
                    <ReferenceField source="user_id" reference="users">
                        <TextField source="username" />
                    </ReferenceField>
                </ReferenceField>
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <MoneyInput source="amount" />
                <ReferenceInput source="from_account_id" reference="accounts" filterToQuery={searchText => ({ name: searchText })}>
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="to_account_id" reference="accounts" filterToQuery={searchText => ({ name: searchText })}>
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </CreateDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <ReferenceField label="Depuis" source="sub_transaction_id" reference="transactions" link="show">
                    <ReferenceField source="account_id" reference="accounts">
                        <TextField source="name" />
                    </ReferenceField>
                </ReferenceField>
                <ReferenceField label="Transaction soustraction" source="sub_transaction_id" reference="transactions" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Vers" source="add_transaction_id" reference="transactions" link="show">
                    <ReferenceField source="account_id" reference="accounts">
                        <TextField source="name" />
                    </ReferenceField>
                </ReferenceField>
                <ReferenceField label="Transaction addition" source="add_transaction_id" reference="transactions" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Montant" source="add_transaction_id" reference="transactions" link="show">
                    <MoneyField source="amount" noLabel={true} />
                </ReferenceField>
                <ReferenceField label="Créateur" source="add_transaction_id" reference="transactions" link="show">
                    <ReferenceField source="user_id" reference="users">
                        <TextField source="username" />
                    </ReferenceField>
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
