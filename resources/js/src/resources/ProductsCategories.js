import * as React from "react";
import { Datagrid, EditButton, List, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const ProductsCategoriesFilters = [
    <TextInput source="name" />
];

const ProductsCategories = (props) => (
    <>
        <List {...props} filters={ProductsCategoriesFilters}>
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
    list: ProductsCategories,
    create: ProductsCategories,
    edit: ProductsCategories,
    show: ProductsCategories
};
