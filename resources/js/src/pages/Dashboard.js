import { Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import axios from 'axios';
import * as React from "react";
import { Title, useNotify, useTranslate } from 'react-admin';

export default () => {
    const notify = useNotify();
    const [data, setData] = React.useState({});
    const translate = useTranslate();

    React.useEffect(() => {
        axios.get('/api/dashboard').then((response) => {
            console.log(response.data);
            setData(response.data);
        }).catch((error) => {
            notify(error?.response?.data?.message);
        });
    }, []);

    return (
        <Grid container spacing={1}>
            <Title title={translate('dashboard.welcome')} />
            {('products_alerts' in data ? (
                <Grid item xs={12} md={6}>
                    <Card>
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
            ) : '')}
        </Grid >
    );
};
