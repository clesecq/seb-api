import * as React from "react";
import { Datagrid, EditButton, List, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const PeopleFilters = [
    <TextInput source="firstname" />,
    <TextInput source="lastname" />,
    <TextInput source="discord_id" />
];

const People = (props) => (
    <>
        <List {...props} filters={PeopleFilters}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="discord_id" />
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <TextInput source="discord_id" />
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <TextInput source="discord_id" />
                <DateInput disabled source="created_at" />
                <DateInput disabled source="updated_at" />
            </SimpleForm>
        </EditDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="discord_id" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: People,
    create: People,
    edit: People,
    show: People
};
