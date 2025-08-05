import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Contact App</h1>
        <p>
          <a href="">Hanieh Karami</a> | React.js Course{" "}
        </p>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>Developed by Hanieh Karami </p>
      </footer>
      </div>
  
  );
}

export default Layout;
