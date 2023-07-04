const { Router } = require("express");
const {
  addClient,
  getClients,
  getClientByID,
  updateClientByID,
  deleteClient,
} = require("../controllers/client.controller");

const router = Router();

router.post("/add", addClient);
router.get("/", getClients);
router.get("/:id", getClientByID);
router.put("/:id", updateClientByID);
router.delete("/:id", deleteClient);

module.exports = router;
