import Head from "next/head";
import Next from "../components/next";
import Test from "../components/test";
import Scroll from "../src/hoc/Scroll";

function Home() {
  return <Scroll page={0}>{[Next, Test]}</Scroll>;
}

export default Home;
