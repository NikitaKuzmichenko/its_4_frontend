import React from 'react';
import { Navigate } from "react-router-dom";
import UserRecord from "../../components/userRecord/UserRecord";
import Table from "react-bootstrap/Table";
import Styles from "./UserTable.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserService from "../../service/UserService"
import AuthenticationService from "../../service/AuthenticationService"

class UsersTablePage extends React.Component {
  
  state = {redirectToLoginForm : false};

  constructor(props) {
    super(props); 
    this.getUsers();
    this.checkBoxRef = React.createRef();
    this.selectedUsers = new Set();
    this.usersRecords = [];
  }

  removeSelectedUser(id){
    this.selectedUsers.delete(id);
  }

  addSelectedUser(id){
    this.selectedUsers.add(id);
  }

  clearSelectedUsers(){
    this.selectedUsers = new Set();
  }

  isCurrentUserAffected(){
    return this.selectedUsers.has(AuthenticationService.getCurrentUserId());
  }

  redirectToLoginPage(){
    AuthenticationService.logOutCurrentUser();
    this.redirectToLoginForm = true;
  }

  handleErrors(errorCode){
    this.redirectToLoginForm = false;
    if(errorCode.message == 403){
      AuthenticationService.logOutCurrentUser();
    }
    this.redirectToLoginForm = true;
    this.forceUpdate();
  }

  getUsers() {
    UserService.getAllUsers()
      .then((response) => response.json())
      .then((data) => {
        this.usersRecords = data;
        this.forceUpdate();
      })
      .catch((error) => this.handleErrors(error));
  }

  hendle = (data) => {
    if(data.selected) {
      this.addSelectedUser(data.userId);
    } else {
      this.removeSelectedUser(data.userId);
    }
    this.forceUpdate();
  };

  changAllCheckBoxesState = ()=> {
    if (this.checkBoxRef.current.checked) {
      this.usersRecords.forEach(user => this.selectedUsers.add(user.id))
    } else {
      this.clearSelectedUsers();
    }
    this.forceUpdate();
  }

  isUsersSelected(){
    return this.selectedUsers !== undefined && this.selectedUsers.size !== 0;
  }

  blockAll = ()=> {
    if(this.isUsersSelected()){
        UserService.blockUsersById(this.selectedUsers).then(()=>{
          if(this.isCurrentUserAffected()){
            this.redirectToLoginPage();
          }
          this.getUsers();
          this.forceUpdate();
      }
      ).catch((error) => this.handleErrors(error));
    }
  }

  unblockAll = ()=> {
    if(this.isUsersSelected()){
        UserService.unblockUsersById(this.selectedUsers).then(()=>{
          if(this.isCurrentUserAffected()){
            this.redirectToLoginPage();
          }
          this.getUsers();
          this.forceUpdate();
      }
      ).catch((error) => this.handleErrors(error));
    }
  }

  deletell = ()=> {
    if(this.isUsersSelected()){
        UserService.deleteUsersById(this.selectedUsers).then(()=>{
          if(this.isCurrentUserAffected()){
            this.redirectToLoginPage();
          }
          this.getUsers();
          this.forceUpdate();
      }
      ).catch((error) => this.handleErrors(error));
    }
  }

  render(){
    return (
      <div className={Styles.table_holder}>
        {this.redirectToLoginForm && (
          <Navigate to="/login" replace={true} />
        )}
        <Navbar className={Styles.table_toolbar}>
          <Container>
            <Navbar.Brand>Users</Navbar.Brand>
            <Button variant="primary" onClick={this.blockAll}>
              Block
            </Button>
            <Button variant="primary" onClick={this.unblockAll}>
              Unblock
            </Button>
            <Button variant="primary" onClick={this.deletell}>
              Delete
            </Button>
          </Container>
        </Navbar>
        <Table className={Styles.user_table} bordered hover size="sm">
          <thead>
            <tr>
              <th>
                <Form.Check
                  ref={this.checkBoxRef}
                  onClick={this.changAllCheckBoxesState}
                  type="checkbox"
                />
              </th>
              <th>Id</th>
              <th>User name</th>
              <th>Email</th>
              <th>Registration date</th>
              <th>Login date</th>
              <th>Blocked</th>
            </tr>
          </thead>
          <tbody >
            {this.usersRecords.map((user) => {
              return (
                <UserRecord
                  key={user.id}
                  user={user}
                  isChecked={this.selectedUsers.has(user.id)}
                  onClickEvent={this.hendle}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UsersTablePage;
