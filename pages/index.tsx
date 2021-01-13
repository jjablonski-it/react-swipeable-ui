import { useRouter } from "next/dist/client/router";
import Page from "../components/Page";
import Scroll from "../utils/module/Scroll";
import styles from "../styles/Pages.module.css";

function Home() {
  return (
    <Scroll>
      <Page text="One" className={styles.one} pageName="About me" />
      <Page text="Two" className={styles.two} pageName="Skills" />
      <Page text="Three" className={styles.three} pageName="Projects" />
      <Page text="Four" className={styles.four} pageName="Contact" />
    </Scroll>
  );
}

export default Home;
