import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Admin, Resource, ListGuesser } from 'react-admin';
import DataProvider from './DataProvider';
import AuthProvider from './AuthProvider';
import Layout  from './layout/Layout';
import Dashboard from './layout/Dashboard';

import Products from './resources/Products';
import ProductsCategories from './resources/ProductsCategories';

export default class App extends Component {
    render() {
        return (
            <Admin dashboard={Dashboard} layout={Layout} dataProvider={DataProvider} authProvider={AuthProvider}>
                {Products}
                {ProductsCategories}
            </Admin>
        );
    }
};

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
