
import * as React from 'react';
import { DashboardMenuItem, MenuItemLink } from 'react-admin';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import CategoryIcon from '@material-ui/icons/Category';

import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
                            {this.props.leftIcon}
                        </ListItemIcon>
                        <ListItemText primary={this.props.title} />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
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
    <div>
        <MenuItemLink to="/" primaryText="Dashboard" leftIcon={<DashboardIcon />}/>
        <Accordeon title="Products" leftIcon={<LocalCafeIcon />}>
            <MenuItemLink to="/products" primaryText="Products" leftIcon={<LocalCafeIcon />}/>
            <MenuItemLink to="/products_categories" primaryText="Caterogies" leftIcon={<CategoryIcon />}/>
        </Accordeon>
    </div>
);