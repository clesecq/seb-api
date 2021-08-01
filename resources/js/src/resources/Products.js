import * as React from "react";
import { Datagrid, DateField, DateInput, EditButton, NumberField, ReferenceField, ReferenceInput, Resource, SelectInput, TextField, TextInput } from 'react-admin';
import { ModalFormCreate, ModalFormEdit, ModalFormShow, ModalList } from '../components/ModalForm';

const ProductsFilters = [
    <TextInput label="Name" source="name" />,
    <TextInput label="Barcode" source="barcode" />
];

const ProductsList = (props) => (
    <ModalList {...props} filters={ProductsFilters} show={ProductsShow} create={ProductsCreate} edit={ProductsEdit}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="barcode" />
            <TextField source="name" />
            <ReferenceField label="Category" source="category_id" reference="products_categories" >
                <TextField source="name" />
            </ReferenceField>
            <TextField source="price" />
            <NumberField source="count" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
        </Datagrid>
    </ModalList>
);

const ProductsCreate = (props) => (
    <ModalFormCreate {...props}>
        <TextInput source="name" />
        <ReferenceInput label="Category" source="category_id" reference="products_categories">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="barcode" />
        <TextInput source="price" />
    </ModalFormCreate>
);

const ProductsEdit = (props) => (
    <ModalFormEdit {...props}>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <ReferenceInput label="Category" source="category_id" reference="products_categories">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="barcode" />
        <TextInput source="price" />
        <NumberField disabled source="count" />
        <DateInput disabled source="created_at" />
        <DateInput disabled source="updated_at" />
    </ModalFormEdit>
);

const ProductsShow = (props) => (
    <ModalFormShow {...props}>
        <TextField source="id" />
        <TextField source="barcode" />
        <TextField source="name" />
        <ReferenceField label="Category" source="category_id" reference="products_categories" >
            <TextField source="name" />
        </ReferenceField>
        <TextField source="price" />
        <NumberField source="count" />
        <DateField source="created_at" />
        <DateField source="updated_at" />
    </ModalFormShow>
);

export default (
    <Resource name="products" list={ProductsList} />
);
