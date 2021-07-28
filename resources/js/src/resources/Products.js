import * as React from "react";
import { Create, Datagrid, DateField, DateInput, Edit, EditButton, List, NumberField, ReferenceField, ReferenceInput, Resource, SelectInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';

const ProductsFilters = [
    <TextInput label="Name" source="name" />,
    <TextInput label="Barcode" source="barcode" />
];

const ProductsList = (props) => (
    <List {...props} filters={ProductsFilters}>
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
    </List>
);
 

const ProductsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput label="Category" source="category_id" reference="products_categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="barcode" />
            <TextInput source="price" />
        </SimpleForm>
    </Create>
);

const ProductsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
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
        </SimpleForm>
    </Edit>
);

const ProductsShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
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
        </SimpleShowLayout>
    </Show>
);

export default  (
    <Resource name="products" list={ProductsList} show={ProductsShow} create={ProductsCreate} edit={ProductsEdit} />
);
