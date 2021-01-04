import React, { ReactElement } from "react";

interface Props {
  className: string;
  text: string;
}

function Page({ text, className }: Props): ReactElement {
  return <h1 className={className}>{text}</h1>;
}

export default Page;
