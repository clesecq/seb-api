import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import * as React from "react";
import { Datagrid, DateField, Labeled, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import Count from '../pages/Count';

const TransactionsFilters = [
    <TextInput label="Name" source="name" />,
    <ReferenceInput label="Account" source="account_id" reference="accounts">
        <SelectInput optionText="name" />
    </ReferenceInput>,
    <ReferenceInput label="Creator" source="user_id" reference="users">
        <SelectInput optionText="email" />
    </ReferenceInput>
];

const CountField = (props) => {
    const record = useRecordContext(props);
    const { source } = props;

    return record['type'] === 'cash' ? (
        <Labeled source={source} {...props}><>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell>Count</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Total</TableCell>
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
        <List {...props} filters={TransactionsFilters}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="type" />
                <MoneyField noLabel={true} source="balance" />
                <ReferenceField label="Transaction" source="transaction_id" reference="transactions" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Account" source="transaction.account_id" reference="accounts" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Creator" source="transaction.user_id" reference="users">
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
                <ReferenceField label="Transaction" source="transaction_id" reference="transactions" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Account" source="transaction.account_id" reference="accounts" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Creator" source="transaction.user_id" reference="users">
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
