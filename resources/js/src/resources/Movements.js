import React from "react";
import { ArrayField, ArrayInput, BooleanField, BooleanInput, Datagrid, DateField, List, NumberInput, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, SimpleFormIterator, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import { CreateDialog, ShowDialog } from '../components/DialogForm';

const MovementsFilters = [
    <TextInput source="name" />
];

const Movements = (props) => (
    <>
        <List {...props} filters={MovementsFilters} >
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <BooleanField source="rectification" />
                <ReferenceField source="user_id" reference="users">
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
                        <ReferenceInput source="id" reference="products">
                            <SelectInput optionText="name" />
                        </ReferenceInput>

                        <NumberInput source="diff" />
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
                        <TextField source="product_id" />
                        <TextField source="product.name" />
                        <TextField source="count" />
                    </Datagrid>
                </ArrayField>
                <BooleanField source="rectification" />
                <ReferenceField source="user_id" reference="users">
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
