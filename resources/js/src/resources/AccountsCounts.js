import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import * as React from "react";
import { Datagrid, Labeled, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleShowLayout, TextField, TextInput, useRecordContext, useTranslate } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import Count from '../pages/Count';

const TransactionsFilters = [
    <TextInput source="name" />,
    <ReferenceInput source="account_id" reference="accounts">
        <SelectInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput source="user_id" reference="users">
        <SelectInput optionText="username" />
    </ReferenceInput>
];

const CountField = (props) => {
    const record = useRecordContext(props);
    const translate = useTranslate();
    const { source } = props;

    return record['type'] === 'cash' ? (
        <Labeled source={source} {...props}><>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell>{translate('resources.accounts_counts.fields.count')}</TableCell>
                        <TableCell align="right">{translate('resources.accounts_counts.fields.value')}</TableCell>
                        <TableCell align="right">{translate('resources.accounts_counts.fields.total')}</TableCell>
                    </TableRow>
                    {Object.keys(record[source]).map((key) => (
                        <TableRow key={key}>
                            <TableCell>{record[source][key]}</TableCell>
                            <TableCell align="right" component="th" scope="row">
                                {Number(key).toFixed(2)} €
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                                {Number(parseFloat(key) * parseInt(record[source][key])).toFixed(2)} €
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow key={'total'}>
                        <TableCell></TableCell>
                        <TableCell align="right" component="th" scope="row"></TableCell>
                        <TableCell align="right" component="th" scope="row">
                            {Number(record['balance']).toFixed(2)} €
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </></Labeled>
    ) : (<>
        <MoneyField {...props} source="balance" />
    </>);
};

const AccountsCounts = (props) => (
    <>
        <List {...props} filters={TransactionsFilters} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="type" />
                <MoneyField noLabel={true} source="balance" />
                <ReferenceField source="transaction_id" reference="transactions" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="transaction.account_id" reference="accounts" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="transaction.user_id" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
        <ShowDialog>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="type" />
                <CountField source="data" />
                <ReferenceField source="transaction_id" reference="transactions" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="transaction.account_id" reference="accounts" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="transaction.user_id" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: AccountsCounts,
    show: AccountsCounts,
    create: Count
};
