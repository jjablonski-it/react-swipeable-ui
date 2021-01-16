import React, { ReactElement } from "react";
import { PageProps } from "./Scroll";

interface Props extends PageProps {}

function About({}: Props): ReactElement {
  return <h1>About me</h1>;
}

export default About;
