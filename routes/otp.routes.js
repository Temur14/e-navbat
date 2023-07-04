const { Router } = require("express");
const {
  newOtp,
  getOtp,
  updateOtp,
  deleteOtp,
  verifyOtp,
} = require("../controllers/otp.controller");

const router = Router();

router.post("/verify", verifyOtp);
router.post("/newOtp", newOtp);
router.get("/", getOtp);
router.get("/:id", getOtp);
router.put("/:id", updateOtp);
router.delete("/:id", deleteOtp);

module.exports = router;
