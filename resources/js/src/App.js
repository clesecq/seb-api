import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <div className="body">
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/login" component={Login} exact />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
