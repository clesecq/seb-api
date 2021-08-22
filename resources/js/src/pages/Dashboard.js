import { Card, CardContent, CardHeader, Grid, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import React from "react";
import { Error, Loading, Title, useQuery, useTranslate } from 'react-admin';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ColorProvider from '../providers/ColorProvider';

const useStyles = makeStyles({
    good: {
        color: "#4caf50"
    },
    bad: {
        color: "#f44336"
    }
});

const AccountsPanel = ({ data }) => {
    const translate = useTranslate();
    const styles = useStyles();

    return ('accounts' in data || 'stocks_value' in data ? (
        <Grid item xs={12} xl={3}>
            <Card style={{ height: '100%' }}>
                <CardContent>
                    {data['accounts'].length == 0 && !('stocks_value' in data) ? translate('dashboard.alerts.none') : (
                        <Grid container style={{ justifyContent: "space-between" }}>
                            {data['accounts'].length != 0 ? (
                                data['accounts'].map((value, i) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4} lg={3} xl={12} key={i}>
                                            <Typography variant="h6">{value.name}</Typography>
                                            <Typography variant="h4" classes={{ root: value.balance > 0 ? styles.good : styles.bad }}>{value.balance > 0 ? '+' : ''}{Number(value.balance).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })}</Typography>
                                        </Grid>
                                    );
                                })
                            ) : ''}
                            {('stocks_value' in data) ? (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={12}>
                                    <Typography variant="h6">{translate('dashboard.accounts.stocks_value')}</Typography>
                                    <Typography variant="h4" classes={{ root: data.stocks_value > 0 ? styles.good : styles.bad }}>{data.stocks_value > 0 ? '+' : ''}{Number(data.stocks_value).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })}</Typography>
                                </Grid>
                            ) : ''}
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </Grid>
    ) : <></>);
};

const ProductsAlertsPanel = ({ data }) => {
    const translate = useTranslate();

    return ('products_alerts' in data ? (
        <Grid item xs={12} xl>
            <Card style={{ height: '100%' }}>
                <CardHeader title={translate('dashboard.alerts.title')} />
                <CardContent>
                    {data['products_alerts'].length == 0 ? translate('dashboard.alerts.none') : (

                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>{translate('dashboard.alerts.id')}</TableCell>
                                    <TableCell>{translate('dashboard.alerts.name')}</TableCell>
                                    <TableCell>{translate('dashboard.alerts.count')}</TableCell>
                                    <TableCell>{translate('dashboard.alerts.treshold')}</TableCell>
                                </TableRow>
                                {data['products_alerts'].map((value) => (
                                    <TableRow key={value.id}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {value.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {value.count}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {value.alert_level}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </Grid >
    ) : '');
};

const dateFormatter = date => {
    return format(new Date(date), "dd/MM/yyyy");
};

const formatter = (value, name, props) => {
    return (value >= 0 ? '+' : '') + Number(value).toLocaleString('fr-FR', {currency: 'EUR', currencyDisplay: 'symbol', style: 'currency'});
};

const TransactionsGraphPanel = ({ data }) => {
    const translate = useTranslate();

    console.log(data.transactions.accounts);

    return ('transactions' in data !== null ? (
        <Grid item xs={12}>
            <Card style={{ height: '100%' }}>
                <CardHeader title={translate('dashboard.transactions.title')} />
                <CardContent>
                    <ResponsiveContainer width="100%" aspect={4/1}>
                        <LineChart data={data.transactions.data} width={600} height={300}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey={data.transactions.date_field} tickFormatter={dateFormatter} />
                            <Tooltip labelFormatter={dateFormatter} formatter={formatter} />
                            <Legend verticalAlign="top" />
                            <YAxis />
                            {Object.keys(data.transactions.accounts).map((key) => {
                                return <Line stroke={ColorProvider.randomColor(300)} connectNulls type="monotone" dataKey={key} name={data.transactions.accounts[key]} key={key} strokeWidth={2} dot={false} />;
                            })}
                            <CartesianGrid stroke="#505050" strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </Grid>
    ) : '');
}

export default () => {
    const translate = useTranslate();

    const { data, loading, error } = useQuery({
        type: 'getOne',
        resource: 'dashboard',
        payload: { id: 'me' }
    });

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    if (!data) return null;

    return (
        <Grid container spacing={1}>
            <Title title={translate('dashboard.welcome')} />
            <AccountsPanel data={data} />
            <ProductsAlertsPanel data={data} />
            <TransactionsGraphPanel data={data} />
        </Grid >
    );
};
