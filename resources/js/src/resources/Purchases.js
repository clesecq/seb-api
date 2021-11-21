import { useMediaQuery } from '@material-ui/core';
import React from "react";
import { ArrayField, AutocompleteInput, BooleanInput, Create, Datagrid, FormDataConsumer, List, ReferenceField, ReferenceInput, ShowButton, SimpleForm, SimpleList, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from '../components/MoneyInput';
import { MultiProductCountInput, MultiProductCountItem } from "../components/MultiProductCountInput";

const Purchases = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} bulkActionButtons={false} >
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <DateField source="created_at" />
                        <ReferenceField label="Montant" source="transaction_id" reference="transactions" link="show">
                            <MoneyField source="amount" noLabel={true} />
                        </ReferenceField>
                        <ReferenceField label="Créateur" source="transaction_id" reference="transactions" link={false}>
                            <ReferenceField source="user_id" reference="users" link="show">
                                <TextField source="username" />
                            </ReferenceField>
                        </ReferenceField>
                        <ReferenceField source="movement_id" reference="movements" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField source="transaction_id" reference="transactions" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <ShowButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record => record.name}
                        secondaryText={record => new Date(record.created_at).toLocaleString()}
                        tertiaryText={record => <ReferenceField record={record} label="Montant" source="transaction_id" reference="transactions" link={false}>
                            <MoneyField source="amount" noLabel={true} />
                        </ReferenceField>}
                        linkType="show"
                    />
                )}
            </List>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="name" />
                    <ReferenceField label="Montant" source="transaction_id" reference="transactions" link="show">
                        <MoneyField source="amount" noLabel="true" />
                    </ReferenceField>
                    <ReferenceField label="Créateur" source="transaction_id" reference="transactions" link="show">
                        <ReferenceField source="user_id" reference="users">
                            <TextField source="username" />
                        </ReferenceField>
                    </ReferenceField>
                    <ReferenceField label="Produits" source="movement_id" reference="movements" link="show">
                        <ArrayField source="products" >
                            <Datagrid>
                                <ReferenceField source="product_id" reference="products" link="edit">
                                    <TextField source="name" />
                                </ReferenceField>
                                <TextField source="count" />
                            </Datagrid>
                        </ArrayField>
                    </ReferenceField>
                    <DateField source="created_at" />
                </SimpleShowLayout>
            </ShowDialog>
        </>
    );
};

const Buy = (props) => {
    return <>
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <ReferenceInput source="account_id" reference="accounts" filterToQuery={searchText => ({ name: searchText })}>
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="category_id" reference="transactions_categories" filterToQuery={searchText => ({ name: searchText })}>
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <MoneyInput source="amount" />
                <BooleanInput source="has_products" />
                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.has_products &&
                        <MultiProductCountInput source="products" {...rest}>
                            <MultiProductCountItem />
                        </MultiProductCountInput>
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    </>;
};

export default {
    list: Purchases,
    create: Buy,
    show: Purchases
};
