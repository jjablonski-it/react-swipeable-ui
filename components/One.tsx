import React, { ReactElement } from "react";
import styles from "../styles/Pages.module.css";
import classes from "../utils/helpers/classes";

interface Props {}

function One({}: Props): ReactElement {
  return (
    <div className={classes(styles.one, styles.page)}>
      <h1>One</h1>
    </div>
  );
}

export default One;
