/* eslint-disable react/prop-types */
import { Alert } from "react-bootstrap";

function Message({ varient, children }) {
  return <Alert variant={varient}>{children}</Alert>;
}

export default Message;
