import * as React from "react";
import { BooleanField, BooleanInput, Datagrid, DateField, ExportButton, FilterButton, FunctionField, List, ReferenceField, ShowButton, SimpleShowLayout, TextField, TextInput, TopToolbar } from 'react-admin';
import { ShowDialog } from '../components/DialogForm';


const ArchivedMembersFilters = [
    <TextInput source="name" />,
    <TextInput source="firstname" />,
    <TextInput source="lastname" />,
    <TextInput source="discord_id" />,
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
                <TextField source="firstname" />
                <TextField source="lastname" />
                <BooleanField source="payed" />
                <ReferenceField source="transaction_id" reference="transactions" link="show" >
                    <FunctionField render={r => "#" + r.id} />
                </ReferenceField>
                <TextField source="discord_id" />
                <TextField source="school_year" />
                <ShowButton />
            </Datagrid>
        </List>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <BooleanField source="payed" />
                <ReferenceField source="transaction_id" reference="transactions" link="show" >
                    <FunctionField render={r => "#" + r.id} />
                </ReferenceField>
                <TextField source="discord_id" />
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
