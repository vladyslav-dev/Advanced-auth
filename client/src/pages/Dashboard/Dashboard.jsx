import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar.jsx'

const Dashboard = () => {
    return (
        <Switch>
            <Route path="/" exact component={Navbar} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Dashboard