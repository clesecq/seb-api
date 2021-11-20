import { useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { Datagrid, EditButton, List, SimpleForm, SimpleList, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const TransactionsCategoriesFilters = [
    <TextInput source="name" />
];

const TransactionsCategories = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={TransactionsCategoriesFilters}>
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <DateField source="created_at" />
                        <DateField source="updated_at" />
                        <EditButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record => record.name}
                        tertiaryText={record => "#" + record.id}
                        linkType="edit"
                    />
                )}
            </List>
            <CreateDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput source="name" />
                </SimpleForm>
            </CreateDialog>
            <EditDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput disabled source="id" />
                    <TextInput source="name" />
                    <DateInput disabled source="created_at" />
                    <DateInput disabled source="updated_at" />
                </SimpleForm>
            </EditDialog>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="name" />
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </SimpleShowLayout>
            </ShowDialog>
        </>
    );
};

export default {
    list: TransactionsCategories,
    create: TransactionsCategories,
    edit: TransactionsCategories,
    show: TransactionsCategories
};
