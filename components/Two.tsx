import React, { ReactElement } from "react";
import styles from "../styles/Pages.module.css";
import classes from "../utils/helpers/classes";

interface Props {}

function Two({}: Props): ReactElement {
  return (
    <div className={classes(styles.two, styles.page)}>
      <h1>Two</h1>
    </div>
  );
}

export default Two;
