import GetAppIcon from '@material-ui/icons/GetApp';
import * as React from "react";
import { Button, Datagrid, EditButton, List, SimpleForm, SimpleShowLayout, TextField, TextInput, useDataProvider, useNotify } from 'react-admin';
import DateField from '../components/DateField';
import DateInput from '../components/DateInput';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const PeopleFilters = [
    <TextInput source="firstname" />,
    <TextInput source="lastname" />,
    <TextInput source="discord_id" />
];

const download = (data, filename, type) => {
    let file = new Blob([data], { type: type });
    let a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

const PeopleExportButton = ({ record, ...rest }) => {

    const dataProvider = useDataProvider();
    const notify = useNotify();

    const onClick = () => {
        console.log(record.id);
        dataProvider.export('people', { id: record.id }).then((response) => {
            download(JSON.stringify(response), "export.json", "application/json");

            notify('ra.notification.exported');
            console.log(response);
        });
    }


    return (
        <Button label="Exporter" {...rest} onClick={onClick}>
            <GetAppIcon />
        </Button>
    )
};

const People = (props) => (
    <>
        <List {...props} filters={PeopleFilters}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="discord_id" />
                <EditButton />
                <PeopleExportButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput source="firstname" />
                <TextInput source="lastname" />
                <TextInput source="discord_id" />
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <TextInput disabled source="id" />
                <TextInput source="firstname" />
                <TextInput source="lastname" />
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
                <TextField source="discord_id" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: People,
    create: People,
    edit: People,
    show: People
};
