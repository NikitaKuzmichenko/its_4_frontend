import Alert from "react-bootstrap/Alert";
import Style from "./ErrorMsg.module.css";
function ErrorMsg(props) {
  return (
    <Alert className={Style.error_msg} variant="dark">
      {props.errorMsg}
    </Alert>
  );
}

export default ErrorMsg;
