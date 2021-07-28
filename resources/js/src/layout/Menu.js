
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupIcon from '@material-ui/icons/Group';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import * as React from 'react';
import { MenuItemLink } from 'react-admin';



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
        return (
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
        );
    }
}

export const Menu = () => (
    <>
        <MenuItemLink to="/" primaryText="Dashboard" leftIcon={<DashboardIcon />}/>
        <Accordeon title="Products">
            <MenuItemLink to="/products" primaryText="Products" leftIcon={<LocalCafeIcon />}/>
            <MenuItemLink to="/products_categories" primaryText="Caterogies" leftIcon={<CategoryIcon />}/>
        </Accordeon>
        <MenuItemLink to="/members" primaryText="Members" leftIcon={<GroupIcon />}/>
        <MenuItemLink to="/users" primaryText="Users" leftIcon={<AccountBoxIcon />}/>
    </>
);