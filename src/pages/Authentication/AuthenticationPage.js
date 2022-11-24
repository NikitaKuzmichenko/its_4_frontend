import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import styles from "./Authentication.module.css";
import AuthenticationService from "../../service/AuthenticationService"

const AUTHENTICATION_FAILED_ERROR_MSG = "Authentication failed. Check entered data.";
const NOT_ALL_FIELDS_FILLED_ERROR_MSG = "Not all required fields filled.";
const USER_TABLE_URL = "/users";

function AuthenticationPage() {
  const navigate = useNavigate()
  const [errorMsg,setErrorMsg] = useState("");
  const elmailRef = useRef();
  const passwordRef = useRef();

  function isFieldsFilled(){
    return elmailRef.current.value !== undefined && elmailRef.current.value !== ""
      && passwordRef.current.value !== undefined && passwordRef.current.value !== ""
  }

  function createCredentials(){
    return {
      email: elmailRef.current.value,
      password:passwordRef.current.value
    }
  }
  function submit(event) {
    setErrorMsg("")
    event.preventDefault();
    if(!isFieldsFilled()){
      setErrorMsg(NOT_ALL_FIELDS_FILLED_ERROR_MSG);
      return;
    }
    AuthenticationService.logInUser(createCredentials()).
    then(()=>{
      navigate(USER_TABLE_URL);
    }).
    catch((error) => {
      setErrorMsg(AUTHENTICATION_FAILED_ERROR_MSG);
      });
  }

  return (
    <div className={styles.login_form_holder}>
      <h1 className={styles.form_header}>Log In</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" ref={elmailRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </Form.Group>
        { errorMsg !== "" && <ErrorMsg errorMsg={errorMsg}/> }
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AuthenticationPage;
