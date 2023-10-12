const express = require("express");
const app = express();
const cors = require("cors");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");

app.use(cors());
app.use(express.json());

app.get("/products", productsRoutes);
app.get("/products/cart", cartRoutes);
app.post("/products/cartadd", cartRoutes);
app.delete("/products/deletecart/:id", cartRoutes);
app.post("/makeorder/createorder", ordersRoutes);
app.get("/orders", ordersRoutes);
app.delete("/orders/:id", ordersRoutes);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
