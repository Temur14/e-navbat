const { Router } = require("express");
const {
  addService,
  getService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const router = Router();

router.post("/add", addService);
router.get("/", getService);
router.get("/:id", getService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
