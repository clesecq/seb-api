import { Card, CardContent, CardHeader, Grid, makeStyles, Tab, Table, TableBody, TableCell, TableRow, Tabs, Typography } from '@material-ui/core';
import React from "react";
import { Error, Loading, Title, usePermissions, useQuery, useTranslate } from 'react-admin';
import ColorProvider from '../providers/ColorProvider';
import AccountsStatistics from './statistics/AccountsStatistics';
import ProductsStatistics from './statistics/ProductsStatistics';
import SellersStatistics from './statistics/SellersStatistics';

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

    return ('accounts' in data && 'stocks_value' in data ? (
        <Grid item xs={12} lg={4} xl={3}>
            <Card style={{ height: '100%' }}>
                <CardContent>
                    {data['accounts'].length == 0 && !('stocks_value' in data) ? translate('dashboard.alerts.none') : (
                        <Grid container style={{ justifyContent: "space-between" }}>
                            {data['accounts'].length != 0 ? (
                                data['accounts'].map((value, i) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4} lg={12} key={i}>
                                            <Typography variant="h6">{value.name}</Typography>
                                            <Typography variant="h4" classes={{ root: value.balance > 0 ? styles.good : styles.bad }}>{value.balance > 0 ? '+' : ''}{Number(value.balance).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })}</Typography>
                                        </Grid>
                                    );
                                })
                            ) : ''}
                            {('stocks_value' in data) ? (
                                <Grid item xs={12} sm={6} md={4} lg={12}>
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
        <Grid item xs={12} lg xl>
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}

function permMatch(userperms, elemperm) {
    if (userperms === undefined)
        return false;

    const [resource, access] = elemperm.split(".");

    return userperms.includes("*.*") || userperms.includes(resource + ".*") || userperms.includes("*." + access) || userperms.includes(elemperm);
}

const StatisticsPanel = (props) => {
    const [value, setValue] = React.useState(0);
    const { permissions } = usePermissions();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    let i = 0;

    return (permMatch(permissions, "accounts.show") || permMatch(permissions, "sales.show") || permMatch(permissions, "users.show")) ? (
        <Grid item xs={12}>
            <Card style={{ height: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary">
                    {permMatch(permissions, "accounts.show") ? (<Tab label="Comptes" />) : ""}
                    {permMatch(permissions, "sales.show") ? (<Tab label="Stocks" />) : ""}
                    {permMatch(permissions, "users.show") ? (<Tab label="Vendeurs" />) : ""}
                </Tabs>
                {permMatch(permissions, "accounts.show") ? (<TabPanel value={value} index={i++}>
                    <AccountsStatistics />
                </TabPanel>) : ""}
                {permMatch(permissions, "sales.show") ? (<TabPanel value={value} index={i++}>
                    <ProductsStatistics />
                </TabPanel>) : ""}
                {permMatch(permissions, "users.show") ? (<TabPanel value={value} index={i++}>
                    <SellersStatistics />
                </TabPanel>) : ""}
            </Card>
        </Grid>
    ) : "";
};

export default () => {
    const translate = useTranslate();
    ColorProvider.shuffle(300);

    const { data, loading, error } = useQuery({
        type: 'getOne',
        resource: 'dashboard',
        payload: { id: 'home' }
    });

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    if (!data) return null;

    return (
        <Grid container spacing={1}>
            <Title title={translate('dashboard.welcome')} />
            <AccountsPanel data={data} />
            <ProductsAlertsPanel data={data} />
            <StatisticsPanel />
        </Grid >
    );
};
