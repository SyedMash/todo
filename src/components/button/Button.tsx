import {MouseEventHandler } from "react"
import "./Button.css"

interface Props{
    onClick?: MouseEventHandler<HTMLButtonElement>
    name? :string
}

const Button = (props:Props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

export default Button