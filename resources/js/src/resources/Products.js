import { useMediaQuery } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import * as React from "react";
import { AutocompleteInput, BooleanField, BooleanInput, BulkDeleteButton, BulkUpdateButton, CreateButton, Datagrid, EditButton, ExportButton, FilterButton, List, NullableBooleanInput, NumberField, NumberInput, ReferenceField, ReferenceInput, SimpleForm, SimpleList, SimpleShowLayout, TextField, TextInput, TopToolbar, useTranslate } from 'react-admin';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from "../components/MoneyInput";
import { RecalculateButton } from '../components/RecalculateButton';

const ProductsFilters = [
    <TextInput source="name" />,
    <ReferenceInput source="category_id" reference="products_categories" filterToQuery={searchText => ({ name: searchText })}>
        <AutocompleteInput optionText="name" />
    </ReferenceInput>,
    <NullableBooleanInput source="alerts" />,
    <NullableBooleanInput source="salable" />
];

const ProductsListActions = ({ basePath, ...props }) => (
    <TopToolbar>
        <FilterButton />
        <RecalculateButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const ProductsBulkActionButtons = props => {
    const translate = useTranslate();
    return (
        <React.Fragment>
            <BulkUpdateButton {...props} label={translate('resources.products.mark_salabe')} data={{ "salable": true }} icon={<ShoppingCartIcon />} />
            <BulkUpdateButton {...props} label={translate('resources.products.mark_unsalable')} data={{ "salable": false }} icon={<RemoveShoppingCartIcon />} />
            <BulkDeleteButton {...props} />
        </React.Fragment>
    );
};

const Products = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={ProductsFilters} bulkActionButtons={<ProductsBulkActionButtons />} actions={<ProductsListActions />}>
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <ReferenceField source="category_id" reference="products_categories" >
                            <TextField source="name" />
                        </ReferenceField>
                        <MoneyField noLabel={true} source="price" />
                        <NumberField source="count" />
                        <NumberField source="alert_level" />
                        <BooleanField source="salable" />
                        <DateField source="created_at" />
                        <DateField source="updated_at" />
                        <EditButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record => record.name}
                        secondaryText={record =>
                            <ReferenceField record={record} source="category_id" reference="products_categories" link={false}>
                                <TextField source="name" />
                            </ReferenceField>}
                        tertiaryText={record => record.count}
                        linkType="edit"
                    />
                )}
            </List>
            <CreateDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput source="name" />
                    <ReferenceInput source="category_id" reference="products_categories" filterToQuery={searchText => ({ name: searchText })}>
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                    <MoneyInput source="price" />
                    <NumberInput source="alert_level" />
                    <BooleanInput source="salable" defaultValue={true} />
                </SimpleForm>
            </CreateDialog>
            <EditDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput disabled source="id" />
                    <TextInput source="name" />
                    <ReferenceInput source="category_id" reference="products_categories" filterToQuery={searchText => ({ name: searchText })}>
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                    <MoneyInput source="price" />
                    <NumberInput disabled source="count" />
                    <NumberInput source="alert_level" />
                    <BooleanInput source="salable" />
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
                    <BooleanField source="salable" />
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </SimpleShowLayout>
            </ShowDialog>
        </>
    );
};

export default {
    list: Products,
    create: Products,
    edit: Products,
    show: Products
};
