import * as React from "react";
import { RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import Sell from "../pages/Sell";
import Profile from "../resources/Profile";
import ChangePassword from './forms/ChangePassword';
import ForgotPassword from './forms/ForgotPassword';
import ResetPassword from './forms/ResetPassword';
import TokenClear from "./forms/TokenClear";
import TokenNew from './forms/TokenNew';
import TwoFactorDisable from "./forms/TwoFactorDisable";
import TwoFactorEnable from './forms/TwoFactorEnable';

export const customRoutes = [
    <Route exact path="/profile" component={Profile} />,
    <Route exact path="/sell" component={Sell} />,
    <RouteWithoutLayout exact path="/change-password" component={ChangePassword} />,
    <RouteWithoutLayout exact path="/forgot-password" component={ForgotPassword} />,
    <RouteWithoutLayout exact path="/reset-password/:token" component={ResetPassword} />,
    <RouteWithoutLayout exact path="/two-factor/enable" component={TwoFactorEnable} />,
    <RouteWithoutLayout exact path="/two-factor/disable" component={TwoFactorDisable} />,
    <RouteWithoutLayout exact path="/tokens/create" component={TokenNew}/>,
    <RouteWithoutLayout exact path="/tokens/clear" component={TokenClear} />
];