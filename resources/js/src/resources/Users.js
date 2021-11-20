import { useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { AutocompleteArrayInput, AutocompleteInput, Datagrid, EditButton, FunctionField, List, ReferenceArrayInput, ReferenceField, ReferenceInput, SimpleForm, SimpleList, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog } from '../components/DialogForm';

const UsersFilters = [
    <TextInput label="Username" source="username" />,
    <TextInput label="Email" source="email" />
];

const Users = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={UsersFilters}>
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="username" />
                        <ReferenceField source="person_id" reference="people" link="show" >
                            <FunctionField render={r => r.firstname + " " + r.lastname} />
                        </ReferenceField>
                        <TextField source="email" />
                        <DateField source="created_at" />
                        <DateField source="updated_at" />
                        <DateField source="password_changed_at" />
                        <EditButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record => <ReferenceField record={record} source="person_id" reference="people" link={false} >
                            <FunctionField render={r => r.firstname + " " + r.lastname} />
                        </ReferenceField>}
                        secondaryText={record => record.username}
                        tertiaryText={record => "#" + record.id}
                        linkType="show"
                    />
                )}
            </List>
            <CreateDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput source="username" />
                    <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, has_account: false })}>
                        <AutocompleteInput optionText="fullname" />
                    </ReferenceInput>
                    <TextInput source="email" />
                    <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
                        <AutocompleteArrayInput />
                    </ReferenceArrayInput>
                </SimpleForm>
            </CreateDialog>
            <EditDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput source="username" />
                    <ReferenceInput disabled source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, has_account: false })}>
                        <AutocompleteInput optionText="fullname" />
                    </ReferenceInput>
                    <TextInput source="email" />
                    <ReferenceArrayInput label="Permissions" reference="permissions" source="permissions">
                        <AutocompleteArrayInput />
                    </ReferenceArrayInput>
                    <DateInput disabled source="created_at" />
                    <DateInput disabled source="updated_at" />
                    <DateInput disabled source="password_changed_at" />
                </SimpleForm>
            </EditDialog>
        </>
    );
};

export default {
    list: Users,
    create: Users,
    edit: Users,
    show: Users
};
