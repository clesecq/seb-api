import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import * as React from "react";
import { Fragment } from 'react';
import { BooleanField, BooleanInput, BulkDeleteButton, BulkUpdateButton, Datagrid, DateField, DateInput, EditButton, FunctionField, List, ReferenceField, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const MembersFilters = [
    <TextInput label="First Name" source="firstname" />,
    <TextInput label="Last Name" source="lastname" />,
    <TextInput label="Email" source="email" />,
    <TextInput label="Card" source="card" />,
    <BooleanInput label="Payed" source="payed" />
];

const MembersBulkActionButtons = props => (
    <Fragment>
        <BulkUpdateButton {...props} label="Mark Payed" data={{ "payed": true }} icon={<AttachMoneyIcon />} />
        <BulkDeleteButton {...props} />
    </Fragment>
);

const Members = (props) => (
    <>
        <List {...props} filters={MembersFilters} bulkActionButtons={<MembersBulkActionButtons />}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="email" />
                <BooleanField source="payed" />
                <ReferenceField label="Transaction" source="transaction_id" reference="transactions" link="show" >
                    <FunctionField render={r => "#" + r.id} />
                </ReferenceField>
                <TextField source="card" />
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <TextInput source="email" />
                <BooleanInput source="payed" />
                <TextInput source="card" />
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <TextInput source="email" />
                <BooleanInput source="payed" />
                <TextInput source="card" />
                <DateInput disabled source="created_at" />
                <DateInput disabled source="updated_at" />
            </SimpleForm>
        </EditDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="email" />
                <BooleanField source="payed" />
                <TextField source="card" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: Members,
    create: Members,
    edit: Members,
    show: Members
};
