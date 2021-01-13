import React, { ReactElement } from "react";
import { NavigationProps } from "../Scroll";

interface Props extends NavigationProps {}

function Navigation({ pages }: Props): ReactElement {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        display: "flex",
        zIndex: 1,
        paddingLeft: "30%",
        justifyContent: "space-around",
        fontSize: "1.5rem",
      }}
    >
      <div>Test</div>
      <div>test2</div>
      <div>test</div>
      <div>sfsdf</div>
    </div>
  );
}

export default Navigation;
