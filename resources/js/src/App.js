import { createBrowserHistory } from 'history';
import React, { Component } from "react";
import { Admin, Resource } from 'react-admin';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import Layout from './layout/Layout';
import Theme from "./layout/Theme";
import AuthProvider from './providers/AuthProvider';
import DataProvider from './providers/DataProvider';
import accounts from "./resources/Accounts";
import members from './resources/Members';
import movements from "./resources/Movements";
import products from './resources/Products';
import productscategories from "./resources/ProductsCategories";
import Profile from "./resources/Profile";
import transactions from "./resources/Transactions";
import transactionscategories from "./resources/TransactionsCategories";
import users from "./resources/Users";

const history = createBrowserHistory();

export default class App extends Component {
    render() {
        return (
            <Admin history={history} dashboard={Dashboard} theme={Theme} layout={Layout} dataProvider={DataProvider} authProvider={AuthProvider} title="Seb" disableTelemetry
                customRoutes={[
                    <Route path="/profile" component={Profile} />
                ]}
            >
                <Resource name="permissions" />
                <Resource name="profile" />
                <Resource name="accounts" {...accounts} />
                <Resource name="members" {...members} />
                <Resource name="transactions" {...transactions} />
                <Resource name="users" {...users} />
                <Resource name="products_categories" {...productscategories} />
                <Resource name="transactions_categories" {...transactionscategories} />
                <Resource name="products" {...products} />
                <Resource name="movements" {...movements} />
            </Admin>
        );
    }
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
