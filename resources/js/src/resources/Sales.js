import React from "react";
import { ArrayField, ArrayInput, Datagrid, DateField, List, NumberInput, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, SimpleFormIterator, SimpleShowLayout, TextField } from 'react-admin';
import { CreateDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";

const SalesFilters = [
    
];

const Sales = (props) => (
    <>
        <List {...props} filters={SalesFilters} >
            <Datagrid>
                <TextField source="id" />
                <DateField source="created_at" label="Date" />
                <MoneyField noLabel={true} source="transaction.amount" label="Amount" />
                <ReferenceField label="User" source="transaction.user_id" reference="users" link="show">
                    <TextField source="username" />
                </ReferenceField>
                <ReferenceField label="Movement" source="movement_id" reference="movements" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Transaction" source="transaction_id" reference="transactions" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ShowButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <ArrayInput source="products">
                    <SimpleFormIterator>
                        <ReferenceInput label="Product" source="id" reference="products">
                            <SelectInput optionText="name" />
                        </ReferenceInput>
                        <NumberInput source="count" label="Count" />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </CreateDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <MoneyField source="transaction.amount" label="Amount" />
                <ReferenceField label="User" source="transaction.user_id" reference="users" link="show">
                    <TextField source="username" />
                </ReferenceField>
                <ArrayField source="movement.products" label="Products">
                    <Datagrid>
                        <TextField source="product_id" label="Id" />
                        <TextField source="product.name" label="Name" />
                        <TextField source="product.barcode" label="Barcode" />
                        <TextField source="count" label="Diff" />
                    </Datagrid>
                </ArrayField>
                <DateField source="created_at" label="Date" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: Sales,
    create: Sales,
    show: Sales
};
