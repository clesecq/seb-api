import React, { Component } from "react";
import { Admin } from 'react-admin';
import ReactDOM from 'react-dom';
import AuthProvider from './AuthProvider';
import DataProvider from './DataProvider';
import Dashboard from './layout/Dashboard';
import Layout from './layout/Layout';
import Members from './resources/Members';
import Products from './resources/Products';
import ProductsCategories from './resources/ProductsCategories';


export default class App extends Component {
    render() {
        return (
            <Admin dashboard={Dashboard} layout={Layout} dataProvider={DataProvider} authProvider={AuthProvider}>
                {Products}
                {ProductsCategories}
                {Members}
            </Admin>
        );
    }
};

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
