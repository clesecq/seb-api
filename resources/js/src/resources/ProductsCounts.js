import * as React from "react";
import { ArrayField, Datagrid, DateField, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import { ShowDialog } from '../components/DialogForm';
import CountProducts from "../pages/CountProducts";

const TransactionsFilters = [
    <TextInput source="name" />,
    <ReferenceInput source="user_id" reference="users">
        <SelectInput optionText="username" />
    </ReferenceInput>
];

const ProductsCounts = (props) => (
    <>
        <List {...props} filters={TransactionsFilters} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField source="movement_id" reference="movements" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="movement.user_id" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <ArrayField source="data">
                    <Datagrid>
                        <ReferenceField source="id" reference="products" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="count" />
                    </Datagrid>
                </ArrayField>
                <ReferenceField source="movement_id" reference="movements" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="movement.user_id" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: ProductsCounts,
    show: ProductsCounts,
    create: CountProducts
};
