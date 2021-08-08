import React from "react";
import { ArrayField, Datagrid, DateField, List, ReferenceField, ShowButton, SimpleShowLayout, TextField } from 'react-admin';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import Buy from "../pages/Buy";

const Purchases = (props) => {
    return (
        <>
            <List {...props} >
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
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
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="name" />
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
};

export default {
    list: Purchases,
    create: Buy,
    show: Purchases
};
