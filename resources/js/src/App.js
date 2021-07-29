import React, { Component } from "react";
import { Admin } from 'react-admin';
import ReactDOM from 'react-dom';
import AuthProvider from './AuthProvider';
import DataProvider from './DataProvider';
import Dashboard from './layout/Dashboard';
import Layout from './layout/Layout';
import Accounts from "./resources/Accounts";
import Members from './resources/Members';
import Movements from "./resources/Movements";
import Products from './resources/Products';
import ProductsCategories from './resources/ProductsCategories';
import Transactions from "./resources/Transactions";
import Users from "./resources/Users";


export default class App extends Component {
    render() {
        return (
            <Admin dashboard={Dashboard} layout={Layout} dataProvider={DataProvider} authProvider={AuthProvider} title="Seb" disableTelemetry>
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
