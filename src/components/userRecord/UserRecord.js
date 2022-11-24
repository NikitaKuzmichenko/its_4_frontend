import Form from "react-bootstrap/Form";
import { useRef } from "react";

function UserRecord(props) {
  const checkBoxRef = useRef(null);

  function toJSONLocal(date) {
    if(date === null || date === undefined){
      return "";
    }
    return new Date(date).toLocaleDateString();
  }

  function emitClickEdvent() {
    props.onClickEvent({
      userId: props.user.id,
      selected: checkBoxRef.current.checked,
    });
  }

  return (
    <tr>
      <td>
        <Form.Check
          type="checkbox"
          checked={props.isChecked}
          ref={checkBoxRef}
          onChange={emitClickEdvent}
        />
      </td>
      <td>{props.user.id}</td>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{toJSONLocal(props.user.registration_date)}</td>
      <td>{toJSONLocal(props.user.last_login_date)}</td>
      <td>{String(props.user.blocked)}</td>
    </tr>
  );
}

export default UserRecord;
