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
                    <DateField source="created_at" />
                    <MoneyField noLabel={true} source="transaction.amount" />
                    <ReferenceField source="transaction.user_id" reference="users" link="show">
                        <TextField source="username" />
                    </ReferenceField>
                    <ReferenceField source="movement_id" reference="movements" link="show">
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField source="transaction_id" reference="transactions" link="show">
                        <TextField source="name" />
                    </ReferenceField>
                    <ShowButton />
                </Datagrid>
            </List>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="name" />
                    <MoneyField source="transaction.amount" />
                    <ReferenceField source="transaction.user_id" reference="users" link="show">
                        <TextField source="username" />
                    </ReferenceField>
                    <ArrayField source="movement.products" >
                        <Datagrid>
                            <TextField source="product_id" />
                            <TextField source="product.name" />
                            <TextField source="count" />
                        </Datagrid>
                    </ArrayField>
                    <DateField source="created_at" />
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
