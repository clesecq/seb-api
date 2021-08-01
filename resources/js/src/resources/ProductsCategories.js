import * as React from "react";
import { Datagrid, DateField, DateInput, EditButton, Resource, TextField, TextInput } from 'react-admin';
import { ModalFormCreate, ModalFormEdit, ModalFormShow, ModalList } from '../components/ModalForm';

const ProductsCategoriesFilters = [
    <TextInput label="Name" source="name" />
];

const ProductsCategoriesList = (props) => (
    <ModalList {...props} filters={ProductsCategoriesFilters} create={ProductsCategoriesCreate} edit={ProductsCategoriesEdit} show={ProductsCategoriesShow}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
        </Datagrid>
    </ModalList>
);

const ProductsCategoriesCreate = (props) => (
    <ModalFormCreate {...props}>
        <TextInput source="name" />
    </ModalFormCreate>
);

const ProductsCategoriesEdit = (props) => (
    <ModalFormEdit {...props}>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <DateInput disabled source="created_at" />
        <DateInput disabled source="updated_at" />
    </ModalFormEdit>
);

const ProductsCategoriesShow = (props) => (
    <ModalFormShow {...props}>
        <TextField source="id" />
        <TextField source="name" />
        <DateField source="created_at" />
        <DateField source="updated_at" />
    </ModalFormShow>
);

export default (
    <Resource name="products_categories" list={ProductsCategoriesList} />
);
