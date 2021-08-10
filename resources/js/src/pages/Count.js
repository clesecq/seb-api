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
import { Title, useDataProvider, useNotify, useTranslate } from 'react-admin';

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

const Item = ({ value, updatePrice, ...props }) => {
    const classes = useStyles();
    const [count, setCount] = useState(0);

    const addCount = ((x) => {

        if (count + x < 0) {
            setCount(0);
            updatePrice(value, 0);
            return;
        }

        setCount(count + x);
        updatePrice(value, count + x);
    });

    useEffect(() => {
        setCount(0);
        updatePrice(value, 0);
    }, [props.refresh]);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>{Number(value).toFixed(2)} €</Typography>
                <Grid container style={{ justifyContent: "center" }}>
                    <Grid item className={classes.rows}>
                        <IconButton aria-label="sub" onClick={(e) => { addCount(e.shiftKey ? -10 : -1) }}>
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
                                    if (val === "")
                                        val = "0";
                                    val = parseInt(val);
                                    if (val !== NaN && val >= 0) {
                                        setCount(val);
                                        updatePrice(value, val);
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
    );
};

const Count = () => {
    let values = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500];

    const dataProvider = useDataProvider();
    const [counts, setCounts] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [selectAccount, setSelectAccount] = useState("");
    const [selectType, setSelectType] = useState("cash");
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [refresh, doRefresh] = useState(0);
    const notify = useNotify();
    const translate = useTranslate();

    useEffect(() => {
        dataProvider.getList('accounts', { pagination: { perPage: 100000, page: 1 }, sort: { field: 'id', order: 'asc' } }).then(({ data }) => {
            setAccounts(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const updatePrice = (value, count) => {
        let c = counts;
        c[value] = count;
        setCounts(c);
        let moula = 0;
        for (let elem in c) {
            moula += c[elem] * parseFloat(elem);
        }
        setPrice(moula);
    };

    let items = values.map((val) => {
        return (
            <Item key={val} value={val} refresh={refresh} updatePrice={updatePrice} />
        );
    });

    const save = () => {
        let data = {
            type: selectType,
            account_id: selectAccount
        };

        if (selectType === "cash") {
            data["data"] = counts;
        } else {
            data["data"] = { amount: price };
        }

        dataProvider.create('accounts_counts', { data: data }).then((response) => {
            doRefresh(prev => prev + 1);
            notify('Count saved!');
        }).catch((error) => {
            notify(error.message, 'warning');
        })
    };

    return (
        <>
            <Grid container>
                <Grid xs={12} item className="MuiToolbar-root MuiToolbar-regular RaTopToolbar-root-56" style={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                    {(selectType === "cash" ? <Button color="primary" startIcon={<ClearIcon />} onClick={() => doRefresh(prev => prev + 1)}>{translate('actions.clear')}</Button> : "")}
                    <Button color="primary" startIcon={<SaveIcon />} onClick={save}>{translate('ra.action.save')}</Button>
                </Grid>
                <Grid item xs={12} md={6} lg={4} style={{ padding: '0 4px' }}>
                    <TextField select variant="filled" type="text" label={translate('sell.account')} value={selectAccount} onChange={(e) => { setSelectAccount(e.target.value) }}>
                        <MenuItem key={""} value={""}><span style={{ color: 'transparent' }}>{translate('sell.none')}</span></MenuItem>
                        {accounts.map((account) => (
                            <MenuItem key={account.id} value={account.id}>
                                {account.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={4} style={{ padding: '0 4px' }}>
                    <TextField select variant="filled" type="text" label={translate('sell.type')} value={selectType} onChange={(e) => { setSelectType(e.target.value) }}>
                        <MenuItem key="cash" value="cash">
                            {translate('sell.cash')}
                        </MenuItem>
                        <MenuItem key="value" value="value">
                            {translate('sell.value')}
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} lg={4} style={{ padding: '0 4px' }}>
                    {(selectType === "cash" ?
                        <TextField value={Number(price).toFixed(2) + " €"} disabled variant="filled" type="text" label={translate('sell.balance')} />
                        :
                        <TextField value={price} onChange={(e) => { setPrice(e.target.value) }} variant="filled" type="text" label={translate('sell.balance')} />
                    )}
                </Grid>
            </Grid>
            <Card>
                <Title title={translate('menu.left.count_money')} />
                {(selectType === "cash" ?
                    <CardContent>
                        <Grid container spacing={3} >
                            {items}
                        </Grid>
                    </CardContent>
                    : "")}
            </Card>
        </>
    );
};

export default Count;
