import React from "react";
//import classNames from "classnames";

export default function Button(props) {
  let buttonClass = props.class;
  
  if (props.save) {
    buttonClass += " button--save";
  }
  if (props.cancel) {
    buttonClass += " button--cancel";
  }
  if (props.login) {
    buttonClass += " button--login";
  }
  
  return <button onClick={props.onClick} className={buttonClass}>{props.children}</button>;
}
