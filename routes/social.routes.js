const { Router } = require("express");
const {
  addSocial,
  getSocial,
  updateSocial,
  deleteSocial,
} = require("../controllers/social.controller");

const router = Router();

router.post("/add", addSocial);
router.get("/", getSocial);
router.get("/:id", getSocial);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

module.exports = router;
