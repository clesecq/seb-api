import * as React from "react";
import { Create, Datagrid, DateField, DateInput, Edit, EditButton, List, ListButton, Resource, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';

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
            <ShowButton />
        </Datagrid>
    </List>
);

const ProductsCategoriesCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const ProductsCategoriesCreate = (props) => (
    <Create {...props} actions={<ProductsCategoriesCreateActions />}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

const ProductsCategoriesEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

const ProductsCategoriesEdit = (props) => (
    <Edit {...props} actions={<ProductsCategoriesEditActions />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <DateInput disabled source="created_at" />
            <DateInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);

const ProductsCategoriesShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);

const ProductsCategoriesShow = (props) => (
    <Show {...props} actions={<ProductsCategoriesShowActions />}>
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
