import React, { Component } from "react";
import { Admin, Resource } from 'react-admin';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import DataProvider from './DataProvider';
import Dashboard from './layout/Dashboard';
import Layout from './layout/Layout';
import Theme from "./layout/Theme";
import Accounts from "./resources/Accounts";
import Members from './resources/Members';
import Movements from "./resources/Movements";
import Products from './resources/Products';
import ProductsCategories from './resources/ProductsCategories';
import Profile from "./resources/Profile";
import Transactions from "./resources/Transactions";
import Users from "./resources/Users";

export default class App extends Component {
    render() {
        return (
            <Admin dashboard={Dashboard} theme={Theme} layout={Layout} dataProvider={DataProvider} authProvider={AuthProvider} title="Seb" disableTelemetry
                    customRoutes={[
                        <Route path="/profile" component={Profile} />
                    ]}
            >
                <Resource name="profile" />
                {Products}
                {ProductsCategories}
                {Members}
                {Users}
                {Accounts}
                {Transactions}
                {Movements}
            </Admin>
        );
    }
};

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
