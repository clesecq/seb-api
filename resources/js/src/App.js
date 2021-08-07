import { createBrowserHistory } from 'history';
import React, { Component } from "react";
import { Admin, Resource } from 'react-admin';
import ReactDOM from 'react-dom';
import Layout from './layout/Layout';
import Login from './layout/Login';
import { customRoutes } from "./layout/Routes";
import Theme from "./layout/Theme";
import Dashboard from './pages/Dashboard';
import AuthProvider from './providers/AuthProvider';
import DataProvider from './providers/DataProvider';
import I18nProvider from "./providers/I18nProvider";
import accounts from "./resources/Accounts";
import accountscounts from './resources/AccountsCounts';
import members from './resources/Members';
import movements from "./resources/Movements";
import products from './resources/Products';
import productscategories from "./resources/ProductsCategories";
import sales from "./resources/Sales";
import transactions from "./resources/Transactions";
import transactionscategories from "./resources/TransactionsCategories";
import users from "./resources/Users";

const history = createBrowserHistory();

export default class App extends Component {
    render() {
        return (
            <Admin customRoutes={customRoutes} i18nProvider={I18nProvider} loginPage={Login} history={history} dashboard={Dashboard} theme={Theme} layout={Layout} dataProvider={DataProvider} authProvider={AuthProvider} title="Seb" disableTelemetry>
                <Resource name="permissions" />
                <Resource name="profile" />
                <Resource name="tokens" />
                <Resource name="accounts" {...accounts} />
                <Resource name="accounts_counts" {...accountscounts} />
                <Resource name="members" {...members} />
                <Resource name="transactions" {...transactions} />
                <Resource name="users" {...users} />
                <Resource name="products_categories" {...productscategories} />
                <Resource name="transactions_categories" {...transactionscategories} />
                <Resource name="products" {...products} />
                <Resource name="movements" {...movements} />
                <Resource name="sales" {...sales} />
            </Admin>
        );
    }
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
