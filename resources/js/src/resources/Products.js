import * as React from "react";
import { Create, Datagrid, DateField, DateInput, Edit, EditButton, List, ListButton, NumberField, ReferenceField, ReferenceInput, Resource, SelectInput, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';

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
            <ShowButton />
        </Datagrid>
    </List>
);

const ProductsCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const ProductsCreate = (props) => (
    <Create {...props} actions={<ProductsCreateActions />}>
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

const ProductsEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

const ProductsEdit = (props) => (
    <Edit {...props} actions={<ProductsEditActions />}>
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

const ProductsShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);

const ProductsShow = (props) => (
    <Show {...props} actions={<ProductsShowActions />}>
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
