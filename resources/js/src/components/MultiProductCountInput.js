
import { Button, Grid, IconButton, InputAdornment, makeStyles, MenuItem, Paper, TextField, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { useEffect, useState } from "react";
import { Error, Labeled, Loading, useInput, useQuery, useTranslate } from 'react-admin';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#545454'
    },
}));

const MultiProductCountItem = ({ product, filterCategory, filterName, countZero, updatePrice, price, showcount, ...props }) => {
    const classes = useStyles();
    const [count, setCount] = useState(countZero ? "" : 0);

    const addCount = ((x) => {
        let c = count;

        if (countZero) {
            if (c === "") {
                c = 0;
            }
        }

        if (c + x < 0) {
            setCount(countZero ? "" : 0);
            updatePrice(product, countZero ? "" : 0);
            return;
        }

        setCount(c + x);
        updatePrice(product, c + x);
    });

    useEffect(() => {
        setCount(countZero ? "" : 0);
        updatePrice(product, countZero ? "" : 0);
    }, [props.refresh]);

    return (
        ((filterCategory === "" || filterCategory === product.category_id) && (filterName === "" || product.name.toLowerCase().includes(filterName.toLowerCase()))) ?
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>{product.name}</Typography>
                    {price || showcount ?
                        <Typography gutterBottom>
                            {Number(product.price).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })}
                            {price && showcount ? " | " : ''}
                            {Number(product.count).toLocaleString('fr-FR', { style: 'decimal' })}
                        </Typography>
                        : ''}
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid item className={classes.rows}>
                            <IconButton aria-label="sub" onClick={(e) => { addCount(e.shiftKey ? -10 : -1) }}>
                                <RemoveIcon />
                            </IconButton>
                        </Grid>
                        <Grid item container alignItems="center" className={classes.rows} xs={4}>
                            <Grid item>
                                <TextField
                                    type="text"
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    value={count}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        if (val === "") {
                                            setCount(countZero ? "" : 0);
                                            updatePrice(product, countZero ? "" : 0);
                                            return;
                                        }
                                        val = parseInt(val);
                                        if (val !== NaN && val >= 0) {
                                            setCount(val);
                                            updatePrice(product, val);
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item className={classes.rows}>
                            <IconButton aria-label="add" onClick={(e) => { addCount(e.shiftKey ? 10 : 1) }}>
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            : ""
    );
};


const MultiProductCountInput = ({ total, children, countZero, onlysalable, priceChanged, ...props }) => {
    const { data: products_data, loading: products_loading, error: products_error } = useQuery({
        type: 'getAll',
        resource: 'products',
        payload: {}
    });

    const { data: categories_data, loading: categories_loading, error: categories_error } = useQuery({
        type: 'getAll',
        resource: 'products_categories',
        payload: {}
    });

    const {
        input: { name, onChange, ...rest },
        meta: { touched, error },
        isRequired
    } = useInput(props);

    const translate = useTranslate();
    const [filterName, setFilterName] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const [counts, setCounts] = useState({});
    const [price, setPrice] = useState(0);
    const [refresh, doRefresh] = useState(0);
    const updatePrice = (product, count) => {
        let c = counts;

        if (count === "" && countZero) {
            delete c[product.id];
        } else {
            c[product.id] = { count: count, price: product.price };
        }

        setCounts(c);

        let p = [];
        for (let id in c) {
            if (c[id].count > 0 || countZero) {
                p.push({ 'id': parseInt(id), 'count': counts[id].count });
            }
        }

        if (p.length == 0) {
            onChange(undefined);
        } else {
            onChange(p);
        }

        let moula = 0;
        for (let elem in c) {
            moula += c[elem].count * c[elem].price;
        }
        if (priceChanged !== undefined) {
            priceChanged(moula);
        }
        setPrice(moula);
    };

    if (products_loading || categories_loading) return <Loading />;
    if (products_error) return <Error error={products_error} />;
    if (categories_error) return <Error error={categories_error} />;
    if ((!products_data) || (!categories_data)) return null;

    return (
        <Labeled label={name}>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid item xs={12} md style={{ padding: '8px 4px' }}>
                        <TextField size="small" value={filterName} onChange={(e) => { setFilterName(e.target.value) }} variant="filled" type="text" label={translate('inputs.multiproductcount.filters.name')} InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FilterListIcon />
                                </InputAdornment>
                            ),
                        }} />
                    </Grid>
                    <Grid item xs={12} md style={{ padding: '8px 4px' }}>
                        <TextField select variant="filled" size="small" type="text" label={translate('inputs.multiproductcount.filters.category')} value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value) }} InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" style={{ marginRight: "20px" }} >
                                    <FilterListIcon />
                                </InputAdornment>
                            ),
                        }}>
                            <MenuItem key={""} value={""}><span style={{ color: 'transparent' }}>{translate('inputs.multiproductcount.filters.none')}</span></MenuItem>
                            {categories_data.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md style={{ padding: '8px 4px', display: 'flex', justifyContent: 'end', flexGrow: 0 }}>
                        <Button color="primary" startIcon={<ClearIcon />} onClick={() => doRefresh(prev => prev + 1)}>{translate('actions.clear')}</Button>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2} style={{ height: 'calc(100vh - 420px)', minHeight: '400px', overflowY: 'scroll', width: 'auto', margin: '0' }}>
                    {products_data.map((val, key) => {
                        if (!onlysalable || onlysalable && val.salable)
                            return React.cloneElement(React.Children.only(children), { key: key, product: val, refresh: refresh, filterCategory: filterCategory, filterName: filterName, updatePrice: updatePrice, countZero: countZero });
                    })}
                </Grid>
                {total ? (
                    <Grid item xs={12} style={{ padding: '8px 4px' }}>
                        <TextField value={Number(price).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })} disabled variant="filled" type="text" label={translate('inputs.multiproductcount.price')} />
                    </Grid>
                ) : ''}
            </Grid>
        </Labeled>
    );
}

export { MultiProductCountInput, MultiProductCountItem };

