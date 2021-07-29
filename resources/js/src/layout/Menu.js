
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupIcon from '@material-ui/icons/Group';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import * as React from 'react';
import { useState } from 'react';
import { MenuItemLink, usePermissions } from 'react-admin';

function hasPerm(permissions, perm) {
    if (permissions === undefined)
        return false;

    if (permissions.includes("*")) {
        return true;
    }
    
    if (Array.isArray(perm)) {
        for (let p of perm) {
            if (permissions.includes(p)) {
                return true;
            }
        }
    } else {
        return permissions.includes(perm);
    }
    return false;
}

/*
class Accordeon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {"open": false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({"open": !this.state.open});
    }

    render() {
        const { loading, permissions } = usePermissions();

        return (
            <>{
                (!('permissions' in props) || hasPerm(permissions, props.permissions)) &&
                <>
                    <Tooltip title={this.props.title} placement="right">
                        <MenuItem button onClick={this.handleClick} className={"RaMenuItemLink-root-36 MuiMenuItem-root"}>
                            <ListItemIcon className={"RaMenuItemLink-icon-38"}>
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemIcon>
                            <ListItemText primary={this.props.title} />
                            
                        </MenuItem>
                    </Tooltip>
                    <Collapse in={this.state.open}>
                        {this.props.children}
                    </Collapse>
                </>
             }</>
        );
    }
}
*/

const Accordeon = (props) => {
    const { permissions } = usePermissions();
    const [ open, setOpen] = useState(false);

    return (
        <>{(!('permissions' in props) || hasPerm(permissions, props.permissions)) &&
            <>
                <Tooltip title={props.title} placement="right">
                    <MenuItem button onClick={() => setOpen(!open)} className={"RaMenuItemLink-root-36 MuiMenuItem-root"}>
                        <ListItemIcon className={"RaMenuItemLink-icon-38"}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                        <ListItemText primary={props.title} />
                    </MenuItem>
                </Tooltip>
                <Collapse in={open}>
                    {props.children}
                </Collapse>
            </>}
        </>
    );
}

const Item = (props) => {
    const { permissions } = usePermissions();

    return (
        <>{
            (!('permissions' in props) || hasPerm(permissions, props.permissions)) &&
            <MenuItemLink {...props}/>
        }</>
    );
}

export const Menu = () => {
    return (
        <>
            <Item to="/" primaryText="Dashboard" leftIcon={<DashboardIcon />}/>
            <Accordeon title="Stocks" permissions={["stocks", "products"]}>
                <Item to="/products" permissions="products" primaryText="Products" leftIcon={<LocalCafeIcon />}/>
                <Item to="/products_categories" permissions="products" primaryText="Caterogies" leftIcon={<CategoryIcon />}/>
                <Item to="/stocks" permissions="stocks" primaryText="Stocks" leftIcon={<ShoppingCartIcon />}/>
            </Accordeon>
            <Accordeon title="Accounting" permissions="accounts">
                <Item to="/accounts" permissions="accounts" primaryText="Accounts" leftIcon={<AccountBalanceIcon />}/>
                <Item to="/transactions" permissions="accounts" primaryText="Transactions" leftIcon={<SwapHorizIcon />}/>
            </Accordeon>
            <Item to="/members" permissions="members" primaryText="Members" leftIcon={<GroupIcon />}/>
            <Item to="/users" permissions="users" primaryText="Users" leftIcon={<AccountBoxIcon />}/>
        </>
    );
}