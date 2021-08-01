import React from "react";
import { ArrayField, ArrayInput, BooleanField, BooleanInput, Create, Datagrid, DateField, List, ListButton, NumberInput, ReferenceField, ReferenceInput, Resource, SelectInput, Show, ShowButton, SimpleForm, SimpleFormIterator, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';

const MovementsFilters = [
    <TextInput label="Name" source="name" />
];

const MovementsList = (props) => (
    <List {...props} filters={MovementsFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <BooleanField source="rectification" />
            <ReferenceField label="User" source="user_id" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="created_at" />
            <ShowButton />
        </Datagrid>
    </List>
);

const MovementsCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const MovementsCreate = (props) => (
    <Create {...props} actions={<MovementsCreateActions />}>
        <SimpleForm>
            <TextInput source="name" />
            <BooleanInput source="rectification" />
            <ArrayInput source="products">
                <SimpleFormIterator>
                    <ReferenceInput label="Product" source="id" reference="products">
                        <SelectInput optionText="name" />
                    </ReferenceInput>

                    <NumberInput source="diff" label="Diff" />
                </SimpleFormIterator>
            </ArrayInput>

            {/* TODO: Add way to add products (like ProductsField) */}
        </SimpleForm>
    </Create>
);

const MovementsShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const MovementsShow = (props) => (
    <Show {...props} actions={<MovementsShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <ArrayField source="products">
                <Datagrid>
                    <TextField source="product_id" label="Id" />
                    <TextField source="product.name" label="Name" />
                    <TextField source="product.barcode" label="Barcode" />
                    <TextField source="count" label="Diff" />
                </Datagrid>
            </ArrayField>
            <BooleanField source="rectification" />
            <ReferenceField label="User" source="user_id" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="created_at" />
        </SimpleShowLayout>
    </Show>
);

export default  (
    <Resource name="movements" list={MovementsList} show={MovementsShow} create={MovementsCreate} />
);
