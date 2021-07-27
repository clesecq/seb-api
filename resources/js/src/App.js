import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Admin, Resource, ListGuesser } from 'react-admin';
import DataProvider from './DataProvider';
import AuthProvider from './AuthProvider';

export default class App extends Component {
    render() {
        return (
            <Admin dataProvider={DataProvider} authProvider={AuthProvider}>
                {/*<Resource name="users" list={ListGuesser} />*/}
            </Admin>
        );
    }
};

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
