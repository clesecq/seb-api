import React from 'react';
import { AppBar } from 'react-admin';
import UserMenu from './UserMenu';

const MyAppBar = props => <AppBar {...props} userMenu={<UserMenu />} />;
export default MyAppBar;