const { Router } = require("express");

const clientRouter = require("./client.routes");
const adminRouter = require("./admin.routes");
const otpRouter = require("./otp.routes");
const serviceRouter = require("./service.routes");
const socialRouter = require("./social.routes");

const router = Router();

router.use("/client", clientRouter);
router.use("/admin", adminRouter);
router.use("/otp", otpRouter);
router.use("/services", serviceRouter);
router.use("/socials", socialRouter);

module.exports = router;
