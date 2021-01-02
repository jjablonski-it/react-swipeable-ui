import React, { ReactElement } from "react";

interface Props {}

function Test({}: Props): ReactElement {
  return <div style={{ height: "100vh", overflow: "hidden" }}>Test page</div>;
}

export default Test;
