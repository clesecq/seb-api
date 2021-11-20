import { useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { AutocompleteInput, Datagrid, List, ReferenceField, ReferenceInput, ShowButton, SimpleForm, SimpleList, SimpleShowLayout, TextField } from 'react-admin';
import DateField from '../components/DateField';
import { CreateDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";

const Transferts = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} bulkActionButtons={false}>
                {isDesktop ? (
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
                ) : (
                    <SimpleList
                        primaryText={record => (
                            <>
                                <ReferenceField record={record} label="Depuis" source="sub_transaction_id" reference="transactions" link={false}>
                                    <ReferenceField source="account_id" reference="accounts" link={false}>
                                        <TextField source="name" />
                                    </ReferenceField>
                                </ReferenceField> &rarr; <ReferenceField record={record} label="Vers" source="add_transaction_id" reference="transactions" link={false}>
                                    <ReferenceField source="account_id" reference="accounts" link={false}>
                                        <TextField source="name" />
                                    </ReferenceField>
                                </ReferenceField>
                            </>
                        )}
                        secondaryText={record => new Date(record.created_at).toLocaleDateString()}
                        tertiaryText={record => <ReferenceField record={record} label="Montant" source="add_transaction_id" reference="transactions" link={false}>
                            <MoneyField source="amount" noLabel={true} />
                        </ReferenceField>}
                        linkType="show"
                    />
                )}
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
};

export default {
    list: Transferts,
    create: Transferts,
    show: Transferts
};
