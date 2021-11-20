import { Table, TableBody, TableCell, TableRow, useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { Datagrid, Labeled, List, ReferenceField, ShowButton, SimpleList, SimpleShowLayout, TextField, useRecordContext, useTranslate } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import Count from '../pages/Count';

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
                                {Number(key).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })}
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                                {Number(parseFloat(key) * parseInt(record[source][key])).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow key={'total'}>
                        <TableCell></TableCell>
                        <TableCell align="right" component="th" scope="row"></TableCell>
                        <TableCell align="right" component="th" scope="row">
                            {Number(record['balance']).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </></Labeled>
    ) : (<>
        <MoneyField {...props} source="balance" />
    </>);
};

const AccountsCounts = (props) => {

    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} bulkActionButtons={false}>
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="type" />
                        <MoneyField noLabel={true} source="balance" />
                        <ReferenceField source="transaction_id" reference="transactions" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField label="Compte" source="transaction_id" reference="transactions" link={false}>
                            <ReferenceField source="account_id" reference="accounts" link="show">
                                <TextField source="name" />
                            </ReferenceField>
                        </ReferenceField>
                        <ReferenceField label="Créateur" source="transaction_id" reference="transactions" link={false}>
                            <ReferenceField source="user_id" reference="users" link="show">
                                <TextField source="username" />
                            </ReferenceField>
                        </ReferenceField>
                        <DateField source="created_at" />
                        <ShowButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record =>
                            <ReferenceField record={record} label="Compte" source="transaction_id" reference="transactions" link={false}>
                                <ReferenceField source="account_id" reference="accounts" link={false}>
                                    <TextField source="name" />
                                </ReferenceField>
                            </ReferenceField>}
                        tertiaryText={record => Number(record.balance).toLocaleString('fr-FR', { currency: "EUR", currencyDisplay: 'symbol', style: 'currency' })}
                        secondaryText={record => new Date(record.created_at).toLocaleString()}
                        linkType="show"
                    />
                )}
            </List>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="type" />
                    <CountField source="data" />
                    <ReferenceField source="transaction_id" reference="transactions" link="show">
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Compte" source="transaction_id" reference="transactions" link="show">
                        <ReferenceField source="account_id" reference="accounts" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                    </ReferenceField>
                    <ReferenceField label="Créateur" source="transaction_id" reference="transactions" link="show">
                        <ReferenceField source="user_id" reference="users" link="show">
                            <TextField source="username" />
                        </ReferenceField>
                    </ReferenceField>
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </SimpleShowLayout>
            </ShowDialog>
        </>
    );
};

export default {
    list: AccountsCounts,
    show: AccountsCounts,
    create: Count
};
