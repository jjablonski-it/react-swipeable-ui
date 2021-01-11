import { useRouter } from "next/dist/client/router";
import Page from "../components/Page";
import Scroll from "../utils/module/Scroll";
import styles from "../styles/Pages.module.css";

function Home() {
  const test = (
    <>
      <Page text="One" className={styles.one} />
      <Page text="Two" className={styles.two} />
      <Page text="Three" className={styles.three} />
      <Page text="Four" className={styles.four} />
    </>
  );
  return (
    <Scroll>
      <Page text="One" className={styles.one} pageName="Page one" />
      <Page text="Two" className={styles.two} />
      <Page text="Three" className={styles.three} />
      <Page text="Four" className={styles.four} />
    </Scroll>
  );
}

export default Home;
