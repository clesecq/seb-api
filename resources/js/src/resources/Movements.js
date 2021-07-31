import keyBy from 'lodash/keyBy';
import PropTypes from 'prop-types';
import React from "react";
import { ArrayInput, BooleanField, BooleanInput, Create, Datagrid, DateField, List, ListContextProvider, NumberInput, ReferenceField, ReferenceInput, Resource, SelectInput, Show, ShowButton, SimpleForm, SimpleFormIterator, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';

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

const MovementsCreate = (props) => (
    <Create {...props}>
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


const ProductsField = (props) => {
    const { source } = props;
    const record = useRecordContext(props);

    return (record[source] !== undefined &&
        <ListContextProvider value={{
                data: keyBy(record[source], 'product_id'),
                ids: record[source].map(({ product_id }) => product_id),
                total: record[source].length,
                currentSort: { field: 'product_id', order: 'ASC' },
                basePath: "/posts",
                resource: 'posts',
                selectedIds: []
        }}>
            <Datagrid>
                <TextField source="product_id" label="Id" />
                <TextField source="product.name" label="Name" />
                <TextField source="product.barcode" label="Barcode" />
                <TextField source="count" label="Diff" />
            </Datagrid>
        </ListContextProvider >
    );
}

ProductsField.defaultProps = {
    label: 'Name',
    addLabel: true,
};

ProductsField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const MovementsShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <ProductsField label="Products" source="products" />
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
