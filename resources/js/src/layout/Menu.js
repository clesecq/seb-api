
import { useMediaQuery } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupIcon from '@material-ui/icons/Group';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MoneyIcon from '@material-ui/icons/Money';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import * as React from 'react';
import { useState } from 'react';
import { getResources, MenuItemLink, usePermissions } from 'react-admin';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function permMatch(userperms, elemperm) {
    const [resource, access] = elemperm.split(".");

    return userperms.includes("*.*") || userperms.includes(resource + ".*") || userperms.includes("*." + access) || userperms.includes(elemperm);
}

function hasPerm(permissions, perm) {
    if (permissions === undefined)
        return false;

    if (permissions.includes("*.*")) {
        return true;
    }

    if (Array.isArray(perm)) {
        for (let p of perm) {
            if (permMatch(permissions, p))
                return true;
        }
    } else {
        if (permMatch(permissions, perm))
            return true;
    }
    return false;
}

const Accordeon = ({ children, title, permissions, ...props }) => {
    const { perms } = usePermissions();
    const [open, setOpen] = useState(props.open);

    return (
        <>{(!hasPerm(perms, permissions)) &&
            <>
                <Tooltip title={title} placement="right">
                    <MenuItem button onClick={() => setOpen(!open)} className={"RaMenuItemLink-root-36 MuiMenuItem-root"}>
                        <ListItemIcon className={"RaMenuItemLink-icon-38"}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </MenuItem>
                </Tooltip>
                <Collapse in={open}>
                    {children}
                </Collapse>
            </>}
        </>
    );
}

const Item = (props) => {
    const { permissions } = usePermissions();
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const location = useLocation();
    const regex = new RegExp(`^${props.to}\/|^${props.to}$`);

    return (
        <>{
            (!('permissions' in props) || hasPerm(permissions, props.permissions)) &&
            <MenuItemLink {...props} sidebarIsOpen={open} selected={regex.test(location.pathname)} />
        }</>
    );
}

const Menu = ({ onMenuClick, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const resources = useSelector(getResources);

    return (
        <>
            <Item to="/" primaryText="Dashboard" leftIcon={<DashboardIcon />} />
            <Item to="/sales/create" permissions="sales.create" primaryText="Sell" leftIcon={<LocalOfferIcon />} />
            <Item to="/accounts_counts/create" permissions="accounts_counts.create" primaryText="Accounts Counts" leftIcon={<MoneyIcon />} />
            <Item to="/members" permissions="members.*" primaryText="Members" leftIcon={<GroupIcon />} />
            <Accordeon open={true} title="Stocks" permissions={["products.*", "products_categories.*", "movements.*"]}>
                <Item to="/products" permissions="products.*" primaryText="Products" leftIcon={<LocalCafeIcon />} />
                <Item to="/products_categories" permissions="products_categories.*" primaryText="Categories" leftIcon={<CategoryIcon />} />
                <Item to="/movements" permissions="movements.*" primaryText="Movements" leftIcon={<ShoppingCartIcon />} />
            </Accordeon>
            <Accordeon open={true} title="Accounting" permissions={["accounts.*", "accounts_counts.*", "transactions.*", "transactions_categories.*", "sales.*"]}>
                <Item to="/accounts" permissions="accounts.*" primaryText="Accounts" leftIcon={<AccountBalanceIcon />} />
                <Item to="/accounts_counts" permissions="accounts_counts.*" primaryText="Accounts Counts" leftIcon={<MoneyIcon />} />
                <Item to="/transactions" permissions="transactions.*" primaryText="Transactions" leftIcon={<SwapHorizIcon />} />
                <Item to="/transactions_categories" permissions="transactions_categories.*" primaryText="Categories" leftIcon={<CategoryIcon />} />
                <Item to="/sales" permissions="sales.*" primaryText="Sales" leftIcon={<LocalOfferIcon />} />
            </Accordeon>
            <Item to="/users" permissions="users.*" primaryText="Users" leftIcon={<AccountBoxIcon />} />
            {isXSmall && <Item to="/profile" primaryText="Profile" leftIcon={<AccountCircleIcon />} />}
            {isXSmall && logout}
        </>
    );
};

export { Menu };
