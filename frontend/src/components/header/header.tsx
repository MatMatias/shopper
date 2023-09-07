import { Fragment } from "react";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <Fragment>
      <header className={styles.container}>
        <nav className={styles.nav}>
          <a
            href="https://github.com/MatMatias/shopper"
            target="_blank"
            rel="noopener"
            className={styles.link}
          >
            <img
              className={styles.logo}
              src={"/github-mark-white.svg"}
              alt="GitHub logo"
            />
          </a>
        </nav>
      </header>
    </Fragment>
  );
};
