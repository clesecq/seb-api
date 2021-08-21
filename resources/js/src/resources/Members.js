import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import * as React from "react";
import { Fragment } from 'react';
import { BooleanField, BooleanInput, BulkDeleteButton, BulkUpdateButton, CreateButton, Datagrid, EditButton, ExportButton, FilterButton, FunctionField, List, ReferenceField, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar, useTranslate } from 'react-admin';
import { ArchiveButton } from '../components/ArchiveButton';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const MembersFilters = [
    <TextInput source="firstname" />,
    <TextInput source="lastname" />,
    <TextInput source="discord_id" />,
    <BooleanInput source="payed" />
];

const MembersListActions = ({ basePath, ...props }) => (
    <TopToolbar>
        <FilterButton />
        <ArchiveButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const MembersBulkActionButtons = props => {
    const translate = useTranslate();
    return (
        <Fragment>
            <BulkUpdateButton {...props} label={translate('resources.members.mark_payed')} data={{ "payed": true }} icon={<AttachMoneyIcon />} />
            <BulkDeleteButton {...props} />
        </Fragment>
    );
};

const Members = (props) => (
    <>
        <List {...props} filters={MembersFilters} bulkActionButtons={<MembersBulkActionButtons />} actions={<MembersListActions/>}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <BooleanField source="payed" />
                <ReferenceField source="transaction_id" reference="transactions" link="show" >
                    <FunctionField render={r => "#" + r.id} />
                </ReferenceField>
                <TextField source="discord_id" />
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <BooleanInput source="payed" />
                <TextInput source="discord_id" />
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <BooleanInput source="payed" />
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
                <BooleanField source="payed" />
                <TextField source="discord_id" />
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
