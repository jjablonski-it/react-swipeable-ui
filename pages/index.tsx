import { useRouter } from "next/dist/client/router";
import Page from "../components/Page";
import Scroll from "../utils/module/Scroll";
import styles from "../styles/Pages.module.css";
import Navigation from "../utils/module/comps/Navigation";
import TestNavigation from "../components/TestNavigation";

function Home() {
  return (
    <Scroll navigation={(props) => <TestNavigation {...props} />}>
      <Page text="One" className={styles.one} pageName="About me" />
      <Page text="Two" className={styles.two} pageName="Skills" />
      <Page text="Three" className={styles.three} pageName="Projects" />
      <Page text="Four" className={styles.four} pageName="Contact" />
    </Scroll>
  );
}

export default Home;
