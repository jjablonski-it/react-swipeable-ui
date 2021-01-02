import Next from "../components/Next";
import Test from "../components/Test";
import Scroll from "../utils/hoc/Scroll";
import styles from "../styles/Wrapper.module.css";

function Home() {
  return (
    <div>
      <Scroll page={0}>{[Next, Test, Next, Test, Next]}</Scroll>
    </div>
  );
}

export default Home;
