import "./App.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import MakeOrder from "./components/MakeOrder/MakeOrder";
import Orders from "./components/Orders/Orders";
import Workers from "./components/Workers/Workers";
import AddWorker from "./components/AddWorker/AddWorker";
import AddProduct from "./components/AddProduct/AddProduct";

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
          <Route path="/orders" element={<Orders />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/workers/addworker" element={<AddWorker/>}/>
          <Route path = "/products/addnewproduct" element={<AddProduct/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
