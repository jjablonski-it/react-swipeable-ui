import Next from "../components/Next";
import Scroll from "../utils/hoc/Scroll";
import styles from "../styles/Wrapper.module.css";
import One from "../components/One";
import Two from "../components/Two";
import Four from "../components/Four";
import Three from "../components/Three";

function Home() {
  return (
    <div>
      <Scroll page={0}>{[One, Two, Three, Four]}</Scroll>
    </div>
  );
}

export default Home;
