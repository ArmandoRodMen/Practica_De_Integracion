import { Router } from "express";
import { messagesManager } from "../DAO/mongodb/managers/messagesManager.js";
import { usersManager } from "../DAO/mongodb/managers/usersManager.js";
import { productsManager } from "../DAO/mongodb/managers/productsManager.js";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/home/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const user = await usersManager.findById(idUser);
  const products = await productsManager.findAll();
  const { first_name, last_name, username } = user;
  res.render("home", { first_name, last_name, username, products });
});

router.get("/chat", async (req, res) => {
  const messages = await messagesManager.findAll();
  const {username } = username;
  res.render("chat", { messages, username });
});

export default router;