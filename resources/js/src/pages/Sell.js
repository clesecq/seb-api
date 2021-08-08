import { MenuItem, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';
import { useEffect, useState } from "react";
import { Title, useDataProvider, useNotify } from 'react-admin';

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

const Item = ({ product, filterCategory, filterName, updatePrice, ...props }) => {
    const classes = useStyles();
    const [count, setCount] = useState(0);

    const addCount = ((x) => {

        if (count + x < 0) {
            return;
        }

        setCount(count + x);
        updatePrice(product, count + x);
    });

    useEffect(() => {
        setCount(0);
        updatePrice(product, 0);
    }, [props.refresh]);

    return (
        ((filterCategory === "" || filterCategory === product.category_id) && (filterName === "" || product.name.toLowerCase().includes(filterName.toLowerCase()))) ?
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>{product.name}</Typography>
                    <Typography gutterBottom>{Number(product.price).toFixed(2)} €</Typography>
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid item className={classes.rows}>
                            <IconButton aria-label="sub" onClick={() => { addCount(-1) }}>
                                <RemoveIcon />
                            </IconButton>
                        </Grid>
                        <Grid item container alignItems="center" className={classes.rows} xs={4}>
                            <Grid item>
                                <TextField
                                    id="standard-number"
                                    type="text"
                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                    value={count}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        if(val === "")
                                            val = "0";
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
                            <IconButton aria-label="add" onClick={() => { addCount(1) }}>
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            : ""
    );
};

const Sell = () => {
    const dataProvider = useDataProvider();
    const [counts, setCounts] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [filterName, setFilterName] = useState("");
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [refresh, doRefresh] = useState(0);
    const classes = useStyles();
    const notify = useNotify();

    useEffect(() => {
        dataProvider.getList('products', { pagination: { perPage: 100000, page: 1 }, sort: { field: 'id', order: 'asc' } }).then(({ data }) => {
            setProducts(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
        dataProvider.getList('products_categories', { pagination: { perPage: 100000, page: 1 }, sort: { field: 'id', order: 'asc' } }).then(({ data }) => {
            setCategories(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const updatePrice = (product, count) => {
        let c = counts;
        c[product.id] = { count: count, price: product.price };
        setCounts(c);
        let moula = 0;
        for (let elem in c) {
            moula += c[elem].count * c[elem].price;
        }
        setPrice(moula);
    };

    let items = products.map((val, key) => {
        return (
            <Item key={val.id} product={val} refresh={refresh} filterCategory={selectCategory} filterName={filterName} updatePrice={updatePrice} />
        );
    });

    const save = () => {
        let p = [];
        for (let id in counts) {
            if (counts[id].count > 0) {
                p.push({ 'id': parseInt(id), 'count': counts[id].count });
            }
        }
        dataProvider.create('sales', {data: {products: p}}).then((response) => {
            doRefresh(prev => prev + 1);
            notify('Sale created!');
        }).catch((error) => {
            notify(error.message, 'warning');
        })
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12} md={6} lg={3} style={{ padding: '0 4px' }}>
                    <TextField value={filterName} onChange={(e) => { setFilterName(e.target.value) }} variant="filled" type="text" label="Name" />
                </Grid>
                <Grid item xs={12} md={6} lg={3} style={{ padding: '0 4px' }}>
                    <TextField select variant="filled" type="text" label="Category" value={selectCategory} onChange={(e) => { setSelectCategory(e.target.value) }}>
                        <MenuItem key={""} value={""}><span style={{ color: 'transparent' }}>None</span></MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={3} style={{ padding: '0 4px' }}>
                    <TextField value={Number(price).toFixed(2) + " €"} disabled variant="filled" type="text" label="Price" />
                </Grid>
                <Grid item className="MuiToolbar-root MuiToolbar-regular RaTopToolbar-root-56" style={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                    <Button color="primary" startIcon={<ClearIcon />} onClick={() => doRefresh(prev => prev + 1)}>Clear</Button>
                    <Button color="primary" startIcon={<SaveIcon />} onClick={save}>Save</Button>
                </Grid>
            </Grid>
            <Card>
                <Title title="Sell" />
                <CardContent>
                    <Grid container spacing={3} >
                        {items}
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};

export default Sell;
