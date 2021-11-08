import * as React from "react";
import { AutocompleteInput, BooleanField, BooleanInput, Datagrid, ExportButton, FilterButton, FunctionField, List, ReferenceField, ReferenceInput, ShowButton, SimpleShowLayout, TextField, TopToolbar } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';

const ArchivedMembersFilters = [
    <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText })}>
        <AutocompleteInput optionText="fullname" />
    </ReferenceInput>,
    <BooleanInput source="payed" />
];

const ArchivedMembersListActions = ({ basePath, ...props }) => (
    <TopToolbar>
        <FilterButton />
        <ExportButton />
    </TopToolbar>
);

const ArchivedMembers = (props) => (
    <>
        <List {...props} filters={ArchivedMembersFilters} bulkActionButtons={false} actions={<ArchivedMembersListActions />}>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField source="person_id" reference="people" link="show" >
                    <FunctionField render={r => r.firstname + " " + r.lastname} />
                </ReferenceField>
                <BooleanField source="payed" />
                <ReferenceField source="transaction_id" reference="transactions" link="show" >
                    <FunctionField render={r => "#" + r.id} />
                </ReferenceField>
                <TextField source="school_year" />
                <ShowButton />
            </Datagrid>
        </List>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <ReferenceField source="person_id" reference="people" link="show" >
                    <FunctionField render={r => r.firstname + " " + r.lastname} />
                </ReferenceField>
                <BooleanField source="payed" />
                <ReferenceField source="transaction_id" reference="transactions" link="show" >
                    <FunctionField render={r => "#" + r.id} />
                </ReferenceField>
                <TextField source="school_year" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: ArchivedMembers,
    create: ArchivedMembers,
    show: ArchivedMembers
};
