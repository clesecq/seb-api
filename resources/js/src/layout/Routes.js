import * as React from "react";
import { RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import Profile from "../resources/Profile";
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

export const customRoutes = [
    <Route exact path="/profile" component={Profile} />,
    <RouteWithoutLayout exact path="/forgot-password" component={ForgotPassword} />,
    <RouteWithoutLayout exact path="/reset-password/:token" component={ResetPassword} />
];