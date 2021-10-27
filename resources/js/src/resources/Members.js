import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import * as React from "react";
import { Fragment } from 'react';
import { AutocompleteInput, BooleanField, BooleanInput, BulkDeleteButton, BulkUpdateButton, CreateButton, Datagrid, EditButton, ExportButton, FilterButton, FunctionField, List, ReferenceField, ReferenceInput, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar, useTranslate } from 'react-admin';
import { ArchiveButton } from '../components/ArchiveButton';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const MembersFilters = [
    <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, is_member: true })}>
        <AutocompleteInput optionText="fullname" />
    </ReferenceInput>,
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
        <List {...props} filters={MembersFilters} bulkActionButtons={<MembersBulkActionButtons />} actions={<MembersListActions />}>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField source="person_id" reference="people" link="show" >
                    <FunctionField render={r => r.firstname + " " + r.lastname} />
                </ReferenceField>
                <BooleanField source="payed" />
                <ReferenceField source="transaction_id" reference="transactions" link="show" >
                    <FunctionField render={r => "#" + r.id} />
                </ReferenceField>
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, is_member: false })}>
                    <AutocompleteInput optionText="fullname" />
                </ReferenceInput>
                <BooleanInput source="payed" />
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <ReferenceField source="person_id" reference="people" >
                    <FunctionField render={r => r.firstname + " " + r.lastname} />
                </ReferenceField>
                <BooleanInput source="payed" />
                <DateInput disabled source="created_at" />
                <DateInput disabled source="updated_at" />
            </SimpleForm>
        </EditDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <ReferenceField source="person_id" reference="people" link="show" >
                    <FunctionField render={r => r.firstname + " " + r.lastname} />
                </ReferenceField>
                <BooleanField source="payed" />
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
