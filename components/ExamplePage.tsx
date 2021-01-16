import React, { ReactElement } from "react";
import { PageProps } from "./Scroll";

interface Props extends PageProps {
  text: string;
}

function ExamplePage({ text }: Props): ReactElement {
  return <h1>{text}</h1>;
}

export default ExamplePage;
