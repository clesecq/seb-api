import RefreshIcon from '@material-ui/icons/Refresh';
import * as React from "react";
import { Button, Create, CreateButton, Datagrid, DateField, DateInput, Edit, EditButton, ExportButton, FilterButton, List, ListButton, NumberField, Resource, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput, TopToolbar, useDataProvider, useRefresh } from 'react-admin';

const AccountsFilters = [
    <TextInput label="Name" source="name" />,
    <TextInput label="IBAN" source="iban" />,
    <TextInput label="BIC" source="bic" />,
];
 
const AccountsListActions = (props) => {
    const dataProvider = useDataProvider();
    const refresh = useRefresh();

    return (
        <TopToolbar>
            <FilterButton/>
            <Button
                onClick={() => {
                    dataProvider.reload('accounts').then(() => {
                        refresh();
                    });
                }}
                label="Recalculate"
            ><RefreshIcon/></Button>
            <CreateButton/>
            <ExportButton/>
        </TopToolbar>
    );
};

const AccountsList = (props) => (
    <List {...props} filters={AccountsFilters} actions={<AccountsListActions />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="iban" />
            <TextField source="bic" />
            <NumberField source="balance" />
            <ShowButton />
        </Datagrid>
    </List>
);

const AccountsCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const AccountsCreate = (props) => (
    <Create {...props} actions={<AccountsCreateActions />}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="iban" />
            <TextInput source="bic" />
        </SimpleForm>
    </Create>
);

const AccountsEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

const AccountsEdit = (props) => (
    <Edit {...props} actions={<AccountsEditActions />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="iban" />
            <TextInput source="bic" />
            <DateInput disabled source="created_at" />
            <DateInput disabled source="updated_at" />
        </SimpleForm>
    </Edit>
);

const AccountsShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);

const AccountsShow = (props) => (
    <Show {...props} actions={<AccountsShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="iban" />
            <TextField source="bic" />
            <NumberField source="balance" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);

export default  (
    <Resource name="accounts" list={AccountsList} show={AccountsShow} create={AccountsCreate} edit={AccountsEdit} />
);
