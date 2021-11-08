import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import * as React from "react";
import { AutocompleteInput, Button, CreateButton, Datagrid, ExportButton, FilterButton, FunctionField, List, ReferenceField, ReferenceInput, ShowButton, SimpleForm, SimpleShowLayout, TextField, TopToolbar, useRedirect } from 'react-admin';
import DateField from '../components/DateField';
import { CreateDialog, ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import QRInput from "../components/QRInput";

const PersonalAccountsFilters = [
    <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, has_account: true })}>
        <AutocompleteInput optionText="fullname" />
    </ReferenceInput>
];

const PersonalAccountsListActions = ({ basePath, ...props }) => {
    const redirect = useRedirect();

    return (
        <TopToolbar>
            <Button
                onClick={() => {
                    redirect('/personal_accounts/refill');
                }}
                label="Recharger"
            ><AttachMoneyIcon /></Button>
            <FilterButton />
            <CreateButton />
            <ExportButton />
        </TopToolbar>
    );
}

const PersonalAccounts = (props) => (
    <>
        <List {...props} filters={PersonalAccountsFilters} actions={<PersonalAccountsListActions />}>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField source="person_id" reference="people" link="show" >
                    <FunctionField render={r => r.firstname + " " + r.lastname} />
                </ReferenceField>
                <MoneyField noLabel={true} source="balance" />
                <ShowButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, has_account: false })}>
                    <AutocompleteInput optionText="fullname" />
                </ReferenceInput>
                <QRInput source="token" label="Scan Carte Étudiant" regexp="(?:https?:\/\/esc\.gg\/|core:\/\/)([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}).*" />
            </SimpleForm>
        </CreateDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <ReferenceField source="person_id" reference="people" link="show" >
                    <FunctionField render={r => r.firstname + " " + r.lastname} />
                </ReferenceField>
                <MoneyField noLabel={false} source="balance" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: PersonalAccounts,
    create: PersonalAccounts,
    show: PersonalAccounts
};
