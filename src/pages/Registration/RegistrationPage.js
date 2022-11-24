import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Styles from "./RegistrationPage.module.css";
import UserService from "../../service/UserService"

const REGISTRATION_FAILED_ERROR_MSG = "Registration failed. User with same email alredy exists."
const NOT_ALL_FIELDS_FILLED_ERROR_MSG = "Not all required fields filled."

function RegistrationPage(props) {
  const [errorMsg,setErrorMsg] = useState("");
  const elmailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  function generateUser(){
    return {
      name: userNameRef.current.value,
      email: elmailRef.current.value,
      registration_date : new Date(),
      last_login_date : null,
      blocked: false,
      password: passwordRef.current.value
    }
  }

  function isFieldsFilled(){
    return elmailRef.current.value !== undefined && elmailRef.current.value !== ""
      && userNameRef.current.value !== undefined && userNameRef.current.value !== ""
      && passwordRef.current.value !== undefined && passwordRef.current.value !== ""
  }

  function submit(event) {
    setErrorMsg("");
    event.preventDefault();
    if(!isFieldsFilled()){
      setErrorMsg(NOT_ALL_FIELDS_FILLED_ERROR_MSG);
      return;
    }

    UserService.createUser(generateUser())
    .catch((error) => {
      setErrorMsg(REGISTRATION_FAILED_ERROR_MSG);
      });
  }


  return (
    <div className={Styles.register_form_holder}>
      <h1 className={Styles.form_header}>Register</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" ref={elmailRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            ref={userNameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </Form.Group>
        { errorMsg !== "" &&  <ErrorMsg errorMsg={errorMsg}/> }
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationPage;
