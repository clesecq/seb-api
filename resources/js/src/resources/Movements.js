import { useMediaQuery } from '@material-ui/core';
import React from "react";
import { ArrayField, ArrayInput, AutocompleteInput, BooleanField, BooleanInput, Datagrid, List, NumberInput, ReferenceField, ReferenceInput, ShowButton, SimpleForm, SimpleFormIterator, SimpleList, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import { CreateDialog, ShowDialog } from '../components/DialogForm';

const MovementsFilters = [
    <TextInput source="name" />
];

const Movements = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={MovementsFilters} bulkActionButtons={false} >
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <BooleanField source="rectification" />
                        <ReferenceField source="user_id" reference="users">
                            <TextField source="username" />
                        </ReferenceField>
                        <DateField source="created_at" />
                        <ShowButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record => record.name}
                        tertiaryText={record => "#" + record.id}
                        secondaryText={record => new Date(record.created_at).toLocaleString()}
                        linkType="show"
                    />
                )}
            </List>
            <CreateDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput source="name" />
                    <BooleanInput source="rectification" />
                    <ArrayInput source="products">
                        <SimpleFormIterator>
                            <ReferenceInput source="id" reference="products" filterToQuery={searchText => ({ name: searchText })}>
                                <AutocompleteInput optionText="name" />
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
                    <ArrayField source="products" >
                        <Datagrid>
                            <ReferenceField source="product_id" reference="products" link="edit">
                                <TextField source="name" />
                            </ReferenceField>
                            <TextField source="count" />
                        </Datagrid>
                    </ArrayField>
                    <BooleanField source="rectification" />
                    <ReferenceField source="user_id" reference="users">
                        <TextField source="username" />
                    </ReferenceField>
                    <DateField source="created_at" />
                </SimpleShowLayout>
            </ShowDialog>
        </>
    );
};

export default {
    list: Movements,
    create: Movements,
    show: Movements
};
