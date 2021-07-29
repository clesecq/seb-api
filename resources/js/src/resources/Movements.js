import keyBy from 'lodash/keyBy';
import PropTypes from 'prop-types';
import * as React from "react";
import { BooleanField, BooleanInput, Create, Datagrid, DateField, List, ListContextProvider, ReferenceField, Resource, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';

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
            {/* TODO: Add way to add products (like ProductsField) */}
        </SimpleForm>
    </Create>
);

const ProductsField = (props) => {
    const { source } = props;
    const record = useRecordContext(props);
    const [page, setPage] = React.useState(1);
    const perPage = 50;

    console.log(keyBy(record[source], 'product_id'));

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
    )

    return <span>{JSON.stringify(record[source])}</span>
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
