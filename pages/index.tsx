import About from "../components/About";
import Scroll from "../components/Scroll";
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
