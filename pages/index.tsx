import Scroll from "../utils/hoc/Scroll";
import Page from "../components/Page";

import styles from "../styles/Pages.module.css";

function Home() {
  return (
    <Scroll page={3}>
      <Page text="One" className={styles.one} />
      <Page text="Two" className={styles.two} />
      <Page text="Three" className={styles.three} />
      <Page text="Four" className={styles.four} />
    </Scroll>
  );
}

export default Home;
