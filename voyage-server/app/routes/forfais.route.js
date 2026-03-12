module.exports = (app) => {
  const forfais = require("../controllers/forfais.controller.js");
  const router = require("express").Router();
  router.get("/", forfais.findAll);
  router.post("/", forfais.create);
  router.get("/:id", forfais.findOne);
  router.delete("/:id", forfais.delete);
  router.put("/:id", forfais.update);
  app.use("/api/forfais", router);
};
