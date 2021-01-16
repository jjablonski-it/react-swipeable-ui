import Scroll from "../components/Scroll";
import ExamplePage from "../components/ExamplePage";

function Home() {
  return (
    <Scroll pageIndicator="hover" navigation={false}>
      <ExamplePage text="One" />
      <ExamplePage text="Two" pageName="Custom name" />
      <h1>Html element page example</h1>
    </Scroll>
  );
}

export default Home;
