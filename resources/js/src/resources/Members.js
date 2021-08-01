import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import * as React from "react";
import { Fragment } from 'react';
import { BooleanField, BooleanInput, BulkDeleteButton, BulkUpdateButton, Create, Datagrid, DateField, DateInput, Edit, EditButton, List, ListButton, ReferenceField, Resource, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';

const MembersFilters = [
    <TextInput label="First Name" source="firstname" />,
    <TextInput label="Last Name" source="lastname" />,
    <TextInput label="Email" source="email" />,
    <TextInput label="Card" source="card" />,
    <BooleanInput label="Payed" source="payed" />
];

const MembersBulkActionButtons = props => (
    <Fragment>
        <BulkUpdateButton {...props} label="Mark Payed" data={{"payed": true}} icon={<AttachMoneyIcon/>} />
        <BulkDeleteButton {...props} />
    </Fragment>
);

const MembersList = (props) => (
    <List {...props} filters={MembersFilters} bulkActionButtons={<MembersBulkActionButtons/>}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="lastname" />
            <TextField source="email" />
            <BooleanField source="payed" />
            <ReferenceField label="Transaction" source="transaction_id" reference="transactions" >
                <TextField source="name" />
            </ReferenceField>
            <TextField source="card" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <ShowButton />
        </Datagrid>
    </List>
);

const MembersCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const MembersCreate = (props) => (
    <Create {...props} actions={<MembersCreateActions />}>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="email" />
            <BooleanInput source="payed" />
            <TextInput source="card" />
        </SimpleForm>
    </Create>
);

const MembersEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

const MembersEdit = (props) => (
    <Edit {...props} actions={<MembersEditActions />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="email" />
            <BooleanInput source="payed" />
            <TextInput source="card" />
            <DateInput disabled source="created_at" />
            <DateInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);

const MembersShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);

const MembersShow = (props) => (
    <Show {...props} actions={<MembersShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="lastname" />
            <TextField source="email" />
            <BooleanField source="payed" />
            <ReferenceField label="Transaction" source="transaction_id" reference="transactions" >
                <TextField source="name" />
            </ReferenceField>
            <TextField source="card" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);

export default  (
    <Resource name="members" list={MembersList} show={MembersShow} create={MembersCreate} edit={MembersEdit} />
);
