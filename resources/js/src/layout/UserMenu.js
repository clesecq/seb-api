import CopyrightIcon from '@material-ui/icons/Copyright';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { MenuItemLink, UserMenu, useTranslate } from 'react-admin';
import { connect } from 'react-redux';

const MyUserMenuView = (props) => {
    const { profile, ...alt } = props;
    const translate = useTranslate();

    return (
        <UserMenu label={profile ? profile.nickname : ''} {...alt}>
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
        </UserMenu>
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