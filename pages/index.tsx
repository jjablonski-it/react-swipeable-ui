import Next from "../components/Next";
import Test from "../components/Test";
import Scroll from "../utils/hoc/Scroll";

function Home() {
  return <Scroll page={1}>{[Next, Test, Next, Test, Next]}</Scroll>;
}

export default Home;
