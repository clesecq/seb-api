
import { useMediaQuery } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import BarChartIcon from '@material-ui/icons/BarChart';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupIcon from '@material-ui/icons/Group';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MoneyIcon from '@material-ui/icons/Money';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import * as React from 'react';
import { useState } from 'react';
import { getResources, MenuItemLink, usePermissions, useTranslate } from 'react-admin';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import theme from './Theme';

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
                <Collapse in={open} style={{minHeight: "auto"}}>
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
            <MenuItemLink theme={theme} {...props} sidebarIsOpen={open} selected={regex.test(location.pathname)} />
        }</>
    );
}

const Menu = ({ onMenuClick, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const resources = useSelector(getResources);
    const translate = useTranslate();

    return (
        <>
            <Item to="/" primaryText={translate('menu.left.dashboard')} leftIcon={<DashboardIcon />} />
            <Item to="/sales/create" permissions="sales.create" primaryText={translate('menu.left.sell')} leftIcon={<LocalOfferIcon />} />
            <Item to="/purchases/create" permissions="purchases.create" primaryText={translate('menu.left.buy')} leftIcon={<ShoppingCartIcon />} />
            <Item to="/accounts_counts/create" permissions="accounts_counts.create" primaryText={translate('menu.left.count_money')} leftIcon={<MoneyIcon />} />
            <Item to="/products_counts/create" permissions="products_counts.create" primaryText={translate('menu.left.count_stocks')} leftIcon={<BarChartIcon />} />
            <Accordeon open={false} title={translate('menu.left.humans')} permissions={["people.show", "members.show", "users.show"]}>
                <Item to="/people" permissions="people.show" primaryText={translate('menu.left.people')} leftIcon={<EmojiPeopleIcon />} />
                <Item to="/members" permissions="members.show" primaryText={translate('menu.left.members')} leftIcon={<GroupIcon />} />
                <Item to="/users" permissions="users.show" primaryText={translate('menu.left.users')} leftIcon={<AccountBoxIcon />} />
                <Item to="/personal_accounts" permissions="personal_accounts.show" primaryText={translate('menu.left.personal_accounts')} leftIcon={<AccountBalanceIcon />} />
                <Item to="/personal_transactions" permissions="personal_transactions.show" primaryText={translate('menu.left.personal_transactions')} leftIcon={<SwapHorizIcon />} />
            </Accordeon>
            <Accordeon open={false} title={translate('menu.left.stocks')} permissions={["products.show", "products_categories.show", "movements.show", "products_counts.show"]}>
                <Item to="/products" permissions="products.show" primaryText={translate('menu.left.products')} leftIcon={<LocalCafeIcon />} />
                <Item to="/products_categories" permissions="products_categories.show" primaryText={translate('menu.left.categories')} leftIcon={<CategoryIcon />} />
                <Item to="/products_counts" permissions="products_counts.show" primaryText={translate('menu.left.products_counts')} leftIcon={<BarChartIcon />} />
                <Item to="/movements" permissions="movements.show" primaryText={translate('menu.left.movements')} leftIcon={<SwapHorizIcon />} />
            </Accordeon>
            <Accordeon open={false} title={translate('menu.left.accounting')} permissions={["accounts.show", "accounts_counts.show", "transactions.show", "transactions_categories.show", "sales.show", "purchases.show"]}>
                <Item to="/accounts" permissions="accounts.show" primaryText={translate('menu.left.accounts')} leftIcon={<AccountBalanceIcon />} />
                <Item to="/accounts_counts" permissions="accounts_counts.show" primaryText={translate('menu.left.accounts_counts')} leftIcon={<MoneyIcon />} />
                <Item to="/transactions" permissions="transactions.show" primaryText={translate('menu.left.transactions')} leftIcon={<SwapHorizIcon />} />
                <Item to="/automated_transactions" permissions="automated_transactions.show" primaryText={translate('menu.left.automated_transactions')} leftIcon={<AutorenewIcon />} />
                <Item to="/transactions_categories" permissions="transactions_categories.show" primaryText={translate('menu.left.categories')} leftIcon={<CategoryIcon />} />
                <Item to="/sales" permissions="sales.show" primaryText={translate('menu.left.sales')} leftIcon={<LocalOfferIcon />} />
                <Item to="/purchases" permissions="purchases.show" primaryText={translate('menu.left.purchases')} leftIcon={<ShoppingCartIcon />} />
                <Item to="/transferts" permissions="transferts.show" primaryText={translate('menu.left.transferts')} leftIcon={<ImportExportIcon />} />
            </Accordeon>
            <Accordeon open={false} title={translate('menu.left.archives')} permissions={["archived_members.show"]}>
                <Item to="/archived_members" permissions="archived_members.show" primaryText={translate('menu.left.archived_members')} leftIcon={<GroupIcon />} />
            </Accordeon>
            {isXSmall && <Item to="/profile" primaryText={translate('menu.left.logout')} leftIcon={<AccountCircleIcon />} />}
            {isXSmall && logout}
        </>
    );
};

export { Menu };
