import { Router } from "express";
import { cartsManager } from "../DAO/mongodb/managers/cartsManager.js";

const router = Router();

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  if ( !idCart ) {
    res.status(400).json({ message: "Required data is missing" });
  }
  try {
  const cart = await cartsManager.findCartById(idCart);
  res.json({ cart });} catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  if ( !idCart, !idProduct ) {
    res.status(400).json({ message: "Required data is missing" });
  }try {
  const cart = await cartsManager.addProductToCart(idCart, idProduct);
  res.json({ cart });} catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
  const cart = await cartsManager.getCarts();
  res.json({ cart });} catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
  const cart = await cartsManager.createCart();
  res.json({ cart });} catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
