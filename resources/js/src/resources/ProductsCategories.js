import * as React from "react";
import { Create, Datagrid, DateField, DateInput, Edit, EditButton, List, Resource, Show, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';

const ProductsCategoriesFilters = [
    <TextInput label="Name" source="name" />
];

const ProductsCategoriesList = (props) => (
    <List {...props} filters={ProductsCategoriesFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
        </Datagrid>
    </List>
);

const ProductsCategoriesCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

const ProductsCategoriesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <DateInput disabled source="created_at" />
            <DateInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);

const ProductsCategoriesShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);

export default (
    <Resource name="products_categories" list={ProductsCategoriesList} show={ProductsCategoriesShow} create={ProductsCategoriesCreate} edit={ProductsCategoriesEdit} />
);
