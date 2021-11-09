import { CardHeader, Grid } from '@material-ui/core';
import { format } from 'date-fns';
import _ from 'lodash';
import { default as React } from "react";
import { Error, Loading, useQuery, useTranslate } from 'react-admin';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ColorProvider from '../../providers/ColorProvider';

const dateFormatter = date => {
    return format(new Date(date), "dd/MM/yyyy");
};

const renderCustomizedLabel = (props) => {
    const {
        x, y, width, height, value,
    } = props;

    const fireOffset = width < 100;
    const offset = fireOffset ? -180 : 5;
    return (
        <text x={x + width - offset} y={y + height - (fireOffset ? 4 : 3)} fill={fireOffset ? "#fff" : "#303030"} textAnchor="end">
            {value}
        </text>
    );
};

const BestSellersBarPanel = ({ data }) => {
    const translate = useTranslate();
    let sellers = [];

    if ('sellers' in data)
        sellers = _.orderBy(data.sellers, 'value', 'desc');

    return ('sellers' in data ? (
        <>
            <Grid item xs={12}>
                <CardHeader title={translate('dashboard.sellers.title')} />
                <ResponsiveContainer width="100%" height={sellers.length * 20 + 40}>
                    <BarChart width={100} height={800} data={sellers} layout="vertical">
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" tick={false} />
                        <Tooltip itemStyle={{ color: 'white !important' }} />
                        <Bar dataKey="value" barSize={{ height: 26 }} label={(d) => (d.name)} barSize={16}>
                            {sellers.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={ColorProvider.randomSColor()} />
                            ))}
                            <LabelList dataKey="name" content={renderCustomizedLabel} position="insideRight" style={{ fill: "white" }} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </>
    ) : '');
};

const SellersStatistics = (props) => {
    const { data, loading, error } = useQuery({
        type: 'getOne',
        resource: 'dashboard',
        payload: { id: 'sellers' }
    });

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    if (!data) return null;

    return (
        <Grid container>
            <BestSellersBarPanel data={data} />
        </Grid>
    );
}

export default SellersStatistics;