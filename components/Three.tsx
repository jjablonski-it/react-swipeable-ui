import React, { ReactElement } from "react";
import styles from "../styles/Pages.module.css";
import classes from "../utils/helpers/classes";

interface Props {}

function Three({}: Props): ReactElement {
  return (
    <div className={classes(styles.three, styles.page)}>
      <h1>Three</h1>
    </div>
  );
}

export default Three;
