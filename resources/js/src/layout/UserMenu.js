import SettingsIcon from '@material-ui/icons/Settings';
import React, { Component } from 'react';
import { crudGetOne, MenuItemLink, UserMenu } from 'react-admin';
import { connect } from 'react-redux';

class MyUserMenuView extends Component {
    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = () => {
        this.props.crudGetOne('profile', 'me', '/profile', false);
    };

    render() {
        const { crudGetOne, profile, ...props } = this.props;

        return (
            <UserMenu label={profile ? profile.nickname : ''} {...props}>
                <MenuItemLink
                    to="/profile"
                    primaryText="Profile"
                    leftIcon={<SettingsIcon />}
                />
            </UserMenu>
        );
    }
}

const mapStateToProps = state => {
    const resource = 'profile';
    const id = 'me';
    const profileState = state.admin.resources[resource];

    return {
        profile: profileState ? profileState.data[id] : null
    };
};

const MyUserMenu = connect(
    mapStateToProps,
    { crudGetOne }
)(MyUserMenuView);

export default MyUserMenu;