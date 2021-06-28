import React from 'react'
import { useSelector, useDispatch } from "react-redux";

import Authentication from './pages/Authentication/Authentication.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import * as action from "./store/actions/actions";
import { checkAuth } from './services/AuthService'

const App = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector(state => state.userAuthReducer)
  console.log(isAuth)


  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth().then(result => {
        if (result) {
          console.log('checkAuth result => ', result)
          dispatch(action.setAuthActionCreator(true))
        }
      })
        .catch(err => console.log(err))
    } else {
      dispatch(action.setAuthActionCreator(false))
    }

    return true
  }, [])


  return (
    <div className="App">
      {isAuth ? <Dashboard /> : <Authentication />}
    </div>
  );
}

export default App;
