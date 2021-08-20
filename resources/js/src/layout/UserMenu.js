import {
    Button, Menu
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CopyrightIcon from '@material-ui/icons/Copyright';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { Children, cloneElement, isValidElement, useEffect, useState } from 'react';
import { MenuItemLink, useGetIdentity, useTranslate } from 'react-admin';
import { connect } from 'react-redux';

const useStyles = makeStyles(
    theme => ({
        user: {},
        userButton: {
            textTransform: 'none',
        },
        avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
    }),
    { name: 'RaUserMenu' }
);

const AnchorOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
};

const TransformOrigin = {
    vertical: 'top',
    horizontal: 'right',
};

const CustomUserMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const translate = useTranslate();
    const { loaded, identity } = useGetIdentity();
    const [fullname, setFullname] = useState(null);
    const classes = useStyles(props);

    const {
        children,
        label = 'ra.auth.user_menu',
        icon,
        logout,
    } = props;

    if (!logout && !children) return null;
    const open = Boolean(anchorEl);

    const handleMenu = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const handler = (e) => {
            setFullname(e.detail.email);
        };

        document.addEventListener('profileUpdated', handler);

        return () => {
            document.removeEventListener('profileUpdated', handler);
        }
    });

    return (
        <div className={classes.user}>
            {loaded ? (
                <Button
                    aria-label={label && translate(label, { _: label })}
                    className={classes.userButton}
                    color="inherit"
                    startIcon={<AccountCircle />}
                    onClick={handleMenu}>
                    {fullname === null ? identity?.fullName : fullname}
                </Button>
            ) : ""}
            <Menu
                id="menu-appbar"
                disableScrollLock
                anchorEl={anchorEl}
                anchorOrigin={AnchorOrigin}
                transformOrigin={TransformOrigin}
                getContentAnchorEl={null}
                open={open}
                onClose={handleClose}>
                {Children.map(children, menuItem =>
                    isValidElement(menuItem)
                        ? cloneElement(menuItem, {
                            onClick: handleClose,
                        })
                        : null
                )}
                {logout}
            </Menu>
        </div>
    );
};

const MyUserMenuView = (props) => {
    const { profile, ...alt } = props;
    const translate = useTranslate();

    return (
        <CustomUserMenu label={profile ? profile.fullName : ''} {...alt}>
            <MenuItemLink
                to="/profile"
                primaryText={translate("menu.user.profile")}
                leftIcon={<SettingsIcon />}
            />
            <MenuItemLink
                to="/copying"
                primaryText={translate("menu.user.copying")}
                leftIcon={<CopyrightIcon />}
            />
        </CustomUserMenu>
    );
};

const mapStateToProps = state => {
    const resource = 'profile';
    const id = 'me';
    const profileState = state.admin.resources[resource];

    return {
        profile: profileState ? profileState.data[id] : null
    };
};

const MyUserMenu = connect(
    mapStateToProps
)(MyUserMenuView);

export default MyUserMenu;