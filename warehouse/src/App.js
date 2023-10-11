import "./App.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import MakeOrder from "./components/MakeOrder/MakeOrder";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/makeorder" element={<MakeOrder />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
