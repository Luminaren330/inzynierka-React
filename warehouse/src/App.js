import "./App.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import MakeOrder from "./components/MakeOrder/MakeOrder";
import Orders from "./components/Orders/Orders";
import Workers from "./components/Workers/Workers";
import AddWorker from "./components/AddWorker/AddWorker";
import AddProduct from "./components/AddProduct/AddProduct";
import Error from "./components/Error/Error";
import Login from "./components/Login/Login";
import { useGlobalContext } from "./components/context/context";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const { isLogedIn, isAdmin } = useGlobalContext();
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/makeorder" element={<MakeOrder />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/orders"
            element={isLogedIn ? <Orders /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/workers"
            element={isAdmin ? <Workers /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/workers/addworker"
            element={isAdmin ? <AddWorker /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/products/addnewproduct"
            element={isAdmin ? <AddProduct /> : <Navigate to="/dashboard" />}
          />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
