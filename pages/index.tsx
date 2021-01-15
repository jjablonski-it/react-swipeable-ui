import Scroll from "../utils/module/Scroll";
import About from "../components/About";
import Skills from "../components/Skills";

function Home() {
  return (
    <Scroll pageIndicator="hover">
      <About pageName="About me" />
      <Skills pageName="Skills" />
    </Scroll>
  );
}

export default Home;
