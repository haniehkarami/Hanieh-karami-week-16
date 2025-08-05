import { Toaster } from "react-hot-toast";
import Contact from "./component/Contact";

import Layout from "./layout/Layout";
function App() {
  return (
    <>
      <Layout>
        <Contact />
      </Layout>

      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: "#fff", color: "#304ffe" } },
          error: { style: { background: "#ffebee", color: "#f44336" } },
        }}
      />
    </>
  );
}

export default App;
