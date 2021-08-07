import { Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import axios from 'axios';
import * as React from "react";
import { useNotify } from 'react-admin';

export default () => {
    const notify = useNotify();
    const [data, setData] = React.useState({});

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
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Welcome to the administration" />
                    <CardContent>Lorem ipsum sic dolor amet...</CardContent>
                </Card>
            </Grid>
            {('products_alerts' in data ? (
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Products Alerts" />
                        <CardContent>
                            {data['products_alerts'].length == 0 ? "No products alerts" : (

                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Count</TableCell>
                                            <TableCell>Treshold</TableCell>
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
