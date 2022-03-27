import "react-popper-tooltip/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import Navbar from "./components/Navbar";
import PageRoutes from "./routes/PageRoutes";
import { useInit } from "./utils/useInit";

function App() {
  useInit();

  return (
    <div style={{ background: "#dae0e6" }}>
      <div className="bg-white">
        <Navbar />
      </div>

      <PageRoutes />
    </div>
  );
}

export default App;
