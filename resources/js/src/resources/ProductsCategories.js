import * as React from "react";
import { Resource, SimpleShowLayout, List, Datagrid, TextField, DateField, Create, TextInput, SimpleForm, Edit, EditButton, Show } from 'react-admin';

const ProductsCategoriesList = (props) => (
    <List {... props}>
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
        </SimpleForm>
    </Edit>
);

const ProductsCategoriesShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>
);

export default (
    <Resource name="products_categories" list={ProductsCategoriesList} show={ProductsCategoriesShow} create={ProductsCategoriesCreate} edit={ProductsCategoriesEdit} />
);
