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
import archived_members from "./resources/ArchivedMembers";
import automated_transactions from "./resources/AutomatedTransactions";
import members from './resources/Members';
import movements from "./resources/Movements";
import people from './resources/People';
import personal_accounts from "./resources/PersonalAccounts";
import products from './resources/Products';
import productscategories from "./resources/ProductsCategories";
import productscounts from './resources/ProductsCounts';
import purchases from './resources/Purchases';
import sales from "./resources/Sales";
import transactions from "./resources/Transactions";
import transactionscategories from "./resources/TransactionsCategories";
import transferts from "./resources/Transferts";
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
                <Resource name="people" {...people} />
                <Resource name="members" {...members} />
                <Resource name="transactions" {...transactions} />
                <Resource name="users" {...users} />
                <Resource name="products_categories" {...productscategories} />
                <Resource name="products_counts" {...productscounts} />
                <Resource name="transactions_categories" {...transactionscategories} />
                <Resource name="products" {...products} />
                <Resource name="movements" {...movements} />
                <Resource name="sales" {...sales} />
                <Resource name="purchases" {...purchases} />
                <Resource name="transferts" {...transferts} />
                <Resource name="archived_members" {...archived_members} />
                <Resource name="automated_transactions" {...automated_transactions} />
                <Resource name="personal_accounts" {...personal_accounts} />
            </Admin>
        );
    }
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
