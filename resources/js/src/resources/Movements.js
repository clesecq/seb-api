import React from "react";
import { ArrayField, ArrayInput, BooleanField, BooleanInput, Datagrid, DateField, List, NumberInput, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, SimpleFormIterator, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import { CreateDialog, ShowDialog } from '../components/DialogForm';

const MovementsFilters = [
    <TextInput label="Name" source="name" />
];

const Movements = (props) => (
    <>
        <List {...props} filters={MovementsFilters} >
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
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
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
            </SimpleForm>
        </CreateDialog>
        <ShowDialog>
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
        </ShowDialog>
    </>
);

export default {
    list: Movements,
    create: Movements,
    show: Movements
};
