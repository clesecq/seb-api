import React from "react";
import { ArrayField, ArrayInput, BooleanField, BooleanInput, Datagrid, DateField, NumberInput, ReferenceField, ReferenceInput, Resource, SelectInput, ShowButton, SimpleFormIterator, TextField, TextInput } from 'react-admin';
import { ModalFormCreate, ModalFormShow, ModalList } from '../components/ModalForm';

const MovementsFilters = [
    <TextInput label="Name" source="name" />
];

const MovementsList = (props) => (
    <ModalList {...props} filters={MovementsFilters} show={MovementsShow} create={MovementsCreate}>
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
    </ModalList>
);

const MovementsCreate = (props) => (
    <ModalFormCreate {...props} >
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
    </ModalFormCreate>
);

const MovementsShow = (props) => (
    <ModalFormShow {...props}>
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
    </ModalFormShow>
);

export default (
    <Resource name="movements" list={MovementsList} />
);
