import React, { ReactElement } from "react";
import { PageProps } from "../utils/module/Scroll";

interface Props extends PageProps {
  className: string;
  text: string;
}

function Page({ text, className }: Props) {
  return <h1 className={className}>{text}</h1>;
}

export default Page;
