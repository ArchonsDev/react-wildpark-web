import React from "react";

import styles from './styles.module.css';

const BtnPrimary = ({ onClick, children, ...rest }) => {
  return <button {...rest} type="button" className={`${styles['button-style']} px-4 py-1`} onClick={onClick}>{children}</button>;
}

export default BtnPrimary;