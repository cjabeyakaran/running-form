import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import Login from './Login'

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;