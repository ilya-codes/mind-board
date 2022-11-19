import "../styles/globals.css";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "../components/Context";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <ToastContainer limit={1} />
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
