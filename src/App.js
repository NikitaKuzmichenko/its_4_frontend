import React, {Fragment} from 'react';
import {Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersTablePage from "./pages/UsersTable/UsersTablePage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import AuthenticationPage from './pages/Authentication/AuthenticationPage';
import Header from './components/header/Header'

function App() {
  return (
    <div>
      <Header></Header>
      <Fragment>
        <Routes>
          <Route exact path='/users' element={<UsersTablePage/>}/>
          <Route exact path='/register' element={<RegistrationPage/>}/>
          <Route exact path='/' element={<AuthenticationPage/>}/>
          <Route exact path='/login' element={<AuthenticationPage/>}/>
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;
