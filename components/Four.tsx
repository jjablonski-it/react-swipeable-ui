import React, { ReactElement } from "react";
import styles from "../styles/Pages.module.css";
import classes from "../utils/helpers/classes";

interface Props {}

function Four({}: Props): ReactElement {
  return (
    <div className={classes(styles.four, styles.page)}>
      <h1>Four</h1>
    </div>
  );
}

export default Four;
