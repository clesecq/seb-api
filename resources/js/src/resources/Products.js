import * as React from "react";
import { CreateButton, Datagrid, DateField, DateInput, EditButton, ExportButton, FilterButton, List, NullableBooleanInput, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";
import { RecalculateButton } from '../components/RecalculateButton';

const ProductsFilters = [
    <TextInput source="name" />,
    <ReferenceInput source="category_id" reference="products_categories">
        <SelectInput optionText="name" />
    </ReferenceInput>,
    <NullableBooleanInput source="alerts" />
];

const ProductsListActions = ({ basePath, ...props }) => (
    <TopToolbar>
        <FilterButton />
        <RecalculateButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);


const Products = (props) => (
    <>
        <List {...props} filters={ProductsFilters} actions={<ProductsListActions />}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <ReferenceField source="category_id" reference="products_categories" >
                    <TextField source="name" />
                </ReferenceField>
                <MoneyField noLabel={true} source="price" />
                <NumberField source="count" />
                <NumberField source="alert_level" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="name" />
                <ReferenceInput source="category_id" reference="products_categories">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <MoneyInput source="price" />
                <NumberInput source="alert_level" />
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <TextInput source="name" />
                <ReferenceInput source="category_id" reference="products_categories">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <MoneyInput source="price" />
                <NumberField disabled source="count" />
                <NumberInput source="alert_level" />
                <DateInput disabled source="created_at" />
                <DateInput disabled source="updated_at" />
            </SimpleForm>
        </EditDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <ReferenceField source="category_id" reference="products_categories" >
                    <TextField source="name" />
                </ReferenceField>
                <MoneyField source="price" />
                <NumberField source="count" />
                <NumberField source="alert_level" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: Products,
    create: Products,
    edit: Products,
    show: Products
};
