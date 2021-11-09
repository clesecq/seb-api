import { CardHeader, Grid } from '@material-ui/core';
import { format } from 'date-fns';
import { default as React } from "react";
import { Error, Loading, useQuery, useTranslate } from 'react-admin';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ColorProvider from '../../providers/ColorProvider';

const dateFormatter = date => {
    return format(new Date(date * 1000), "dd/MM/yyyy");
};

const formatter = (value, name, props) => {
    return (value >= 0 ? '+' : '') + Number(value).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' });
};

const CategoriesPiePanel = ({ data }) => {
    const translate = useTranslate();

    return ('categories' in data ? (
        <>
            <Grid item xs={12} md={6} lg={4}>
                <CardHeader title={translate('dashboard.categories_positive.title')} />
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart width={400} height={200}>
                        <Tooltip itemStyle={{ color: 'white !important' }} formatter={formatter} />
                        <Pie dataKey={'value'} label={(d) => (d.name)} data={data.categories_positive} cx="50%" cy="50%" innerRadius={30} outerRadius={50}>
                            {data.categories_positive.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={ColorProvider.randomSColor()} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <CardHeader title={translate('dashboard.categories_negative.title')} />
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart width={400} height={200}>
                        <Tooltip itemStyle={{ color: 'white !important' }} formatter={formatter} />
                        <Pie dataKey={'value'} label={(d) => (d.name)} data={data.categories_negative} cx="50%" cy="50%" innerRadius={30} outerRadius={50}>
                            {data.categories_negative.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={ColorProvider.randomSColor()} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <CardHeader title={translate('dashboard.categories.title')} />
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart width={400} height={200}>
                        <Tooltip itemStyle={{ color: 'white !important' }} formatter={formatter} />
                        <Pie dataKey={'value'} label={(d) => (d.name)} data={data.categories} cx="50%" cy="50%" innerRadius={30} outerRadius={50}>
                            {data.categories.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={ColorProvider.randomSColor()} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Grid>
        </>
    ) : '');
};

const TransactionsGraphPanel = ({ data }) => {
    const translate = useTranslate();

    let start = new Date();
    start.setFullYear(start.getFullYear() - 1);

    return ('transactions' in data ? (
        <Grid item xs={12}>
            <CardHeader title={translate('dashboard.transactions.title')} />
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.transactions.data} width={600} height={300}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis domain={[Math.floor(start.getTime() / 1000), Math.floor(Date.now() / 1000)]} type="number" dataKey={data.transactions.date_field} tickFormatter={dateFormatter} />
                    <Tooltip labelFormatter={dateFormatter} formatter={formatter} />
                    <Legend verticalAlign="top" />
                    <YAxis />
                    {Object.keys(data.transactions.accounts).map((key) => {
                        return <Line stroke={ColorProvider.randomSColor()} connectNulls type="monotone" dataKey={key} name={data.transactions.accounts[key]} key={key} strokeWidth={2} dot={false} />;
                    })}
                    <CartesianGrid stroke="#505050" strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </Grid>
    ) : '');
}

const AccountsStatistics = (props) => {
    const { data, loading, error } = useQuery({
        type: 'getOne',
        resource: 'dashboard',
        payload: { id: 'accounts' }
    });

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    if (!data) return null;

    return (
        <Grid container>
            <TransactionsGraphPanel data={data} />
            <CategoriesPiePanel data={data} />
        </Grid>
    );
}

export default AccountsStatistics;