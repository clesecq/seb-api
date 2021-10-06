import React from "react";
import { ArrayField, Create, Datagrid, List, ReferenceField, ShowButton, SimpleForm, SimpleShowLayout, TextField, useNotify, useRefresh } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import { MultiProductCountInput, MultiProductCountItem } from "../components/MultiProductCountInput";

const Sales = (props) => {
    return (
        <>
            <List {...props} bulkActionButtons={false} >
                <Datagrid>
                    <TextField source="id" />
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

const Sell = props => {
    const refresh = useRefresh();
    const notify = useNotify();

    return <>
        <Create {...props} onSuccess={() => {
            notify('ra.notification.created', 'info', { smart_count: 1 });
            refresh();
        }}>
            <SimpleForm>
                <MultiProductCountInput source="products" total onlysalable>
                    <MultiProductCountItem price showcount />
                </MultiProductCountInput>
            </SimpleForm>
        </Create>
    </>
};

export default {
    list: Sales,
    create: Sell,
    show: Sales
};
