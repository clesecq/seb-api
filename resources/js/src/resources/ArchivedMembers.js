import { useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { AutocompleteInput, BooleanField, BooleanInput, Datagrid, ExportButton, FilterButton, FunctionField, List, ReferenceField, ReferenceInput, ShowButton, SimpleList, SimpleShowLayout, TextField, TopToolbar } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';

const ArchivedMembersFilters = [
    <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText })}>
        <AutocompleteInput optionText="fullname" />
    </ReferenceInput>,
    <BooleanInput source="paid" />
];

const ArchivedMembersListActions = ({ basePath, ...props }) => (
    <TopToolbar>
        <FilterButton />
        <ExportButton />
    </TopToolbar>
);

const ArchivedMembers = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={ArchivedMembersFilters} bulkActionButtons={false} actions={<ArchivedMembersListActions />}>
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
                        <TextField source="school_year" />
                        <ShowButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record =>
                            <ReferenceField record={record} source="person_id" reference="people" link={false} >
                                <FunctionField render={r => r.firstname + " " + r.lastname} />
                            </ReferenceField>}
                        tertiaryText={record => <BooleanField record={record} source="paid" />}
                        secondaryText={record => record.school_year}
                        linkType="show"
                    />
                )}
            </List>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <ReferenceField source="person_id" reference="people" link="show" >
                        <FunctionField render={r => r.firstname + " " + r.lastname} />
                    </ReferenceField>
                    <BooleanField source="paid" />
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
};

export default {
    list: ArchivedMembers,
    create: ArchivedMembers,
    show: ArchivedMembers
};
