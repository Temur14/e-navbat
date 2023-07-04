const { Router } = require("express");
const {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

const router = Router();

router.post("/add", addAdmin);
router.get("/", getAdmin);
router.get("/:id", getAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
