import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Contact App</h1>
        <p>
          <a href="">Hanieh Karami</a> | React.js Course{" "}
        </p>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>Developed by Hanieh Karami </p>
      </footer>
    </>
  );
}

export default Layout;

