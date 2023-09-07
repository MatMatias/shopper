import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>2023 Made by Matheus Matias</p>
      <nav className={styles.nav}>
        <a
          href="https://github.com/MatMatias"
          target="_blank"
          rel="noopener"
          className={styles.link}
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/matheus-matias-9a2a6519a/"
          target="_blank"
          rel="noopener"
          className={styles.link}
        >
          LinkedIn
        </a>
      </nav>
    </footer>
  );
};
