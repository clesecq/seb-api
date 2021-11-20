import { useMediaQuery } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import * as React from "react";
import { Fragment } from 'react';
import { AutocompleteInput, BooleanField, BooleanInput, BulkDeleteButton, BulkUpdateButton, CreateButton, Datagrid, EditButton, ExportButton, FilterButton, FunctionField, List, ReferenceField, ReferenceInput, SimpleForm, SimpleList, SimpleShowLayout, TextField, TextInput, TopToolbar, useTranslate } from 'react-admin';
import { ArchiveButton } from '../components/ArchiveButton';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const MembersFilters = [
    <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, is_member: true })}>
        <AutocompleteInput optionText="fullname" />
    </ReferenceInput>,
    <BooleanInput source="paid" />
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
            <BulkUpdateButton {...props} label={translate('resources.members.mark_payed')} data={{ "paid": true }} icon={<AttachMoneyIcon />} />
            <BulkDeleteButton {...props} />
        </Fragment>
    );
};

const Members = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={MembersFilters} bulkActionButtons={<MembersBulkActionButtons />} actions={<MembersListActions />}>
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <ReferenceField source="person_id" reference="people" link="show" >
                            <FunctionField render={r => r.firstname + " " + r.lastname} />
                        </ReferenceField>
                        <BooleanField source="paid" />
                        <ReferenceField source="transaction_id" reference="transactions" link="show" >
                            <FunctionField render={r => "#" + r.id} />
                        </ReferenceField>
                        <EditButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record =>
                            <ReferenceField record={record} source="person_id" reference="people" link={false} >
                                <FunctionField render={r => r.firstname + " " + r.lastname} />
                            </ReferenceField>}
                        tertiaryText={record => <BooleanField record={record} source="paid" />}
                        linkType="show"
                    />
                )}
            </List>
            <CreateDialog {...props}>
                <SimpleForm redirect="list">
                    <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, is_member: false })}>
                        <AutocompleteInput optionText="fullname" />
                    </ReferenceInput>
                    <BooleanInput source="paid" />
                </SimpleForm>
            </CreateDialog>
            <EditDialog {...props}>
                <SimpleForm redirect="list">
                    <TextInput disabled source="id" />
                    <ReferenceField source="person_id" reference="people" >
                        <FunctionField render={r => r.firstname + " " + r.lastname} />
                    </ReferenceField>
                    <BooleanInput source="paid" />
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
                    <BooleanField source="paid" />
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </SimpleShowLayout>
            </ShowDialog>
        </>
    );
};

export default {
    list: Members,
    create: Members,
    edit: Members,
    show: Members
};
