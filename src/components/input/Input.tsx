import {ChangeEventHandler } from "react";
import "./Input.css";

interface Props{
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = (props:Props) => {
  return <input type="text" placeholder="Enter Task" value={props.value} onChange={props.onChange} />;
};

export default Input;
