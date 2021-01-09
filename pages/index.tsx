import { useRouter } from "next/dist/client/router";
import React, { ReactElement, useEffect } from "react";

interface Props {}

function index({}: Props): ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.replace("/0");
  }, []);

  return <></>;
}

export default index;
