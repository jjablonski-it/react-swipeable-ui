import Next from "../components/Next";
import Scroll from "../utils/hoc/Scroll";
import styles from "../styles/Wrapper.module.css";
import One from "../components/One";
import Two from "../components/Two";
import Four from "../components/Four";
import Three from "../components/Three";
import Page from "../components/Page";

function Home() {
  return (
    <Scroll>
      <One />
      <Two />
      <Three />
      <Four />
      <Page color="red" text="test text" />
    </Scroll>
  );
}

export default Home;
