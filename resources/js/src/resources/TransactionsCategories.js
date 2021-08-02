import * as React from "react";
import { Datagrid, DateField, DateInput, EditButton, List, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const TransactionsCategoriesFilters = [
    <TextInput label="Name" source="name" />
];

const TransactionsCategories = (props) => (
    <>
        <List {...props} filters={TransactionsCategoriesFilters}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="name" />
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <TextInput source="name" />
                <DateInput disabled source="created_at" />
                <DateInput disabled source="updated_at" />
            </SimpleForm>
        </EditDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: TransactionsCategories,
    create: TransactionsCategories,
    edit: TransactionsCategories,
    show: TransactionsCategories
};
