import * as React from "react";
import { Resource, SimpleShowLayout, List, Datagrid, TextField, DateField, NumberField, Create, TextInput, ReferenceInput, SelectInput, SimpleForm, ReferenceField, Edit, EditButton, Show } from 'react-admin';

const ProductsList = (props) => (
    <List {... props}>
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
