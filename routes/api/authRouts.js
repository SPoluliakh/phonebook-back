const express = require("express");

const { authControllers: cntr } = require("../../controllers");
const { validation, auth } = require("../../middlewars");
const { cntrlWrap } = require("../../helpers");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiVerifyEmailSchema,
} = require("../../models/user");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validation(joiRegisterSchema),
  cntrlWrap(cntr.register)
);

authRouter.get("/verify/:verificationToken", cntrlWrap(cntr.verifyEmail));
authRouter.post(
  "/verify/",
  validation(joiVerifyEmailSchema),
  cntrlWrap(cntr.resendVerifyEmail)
);

authRouter.post("/login", validation(joiLoginSchema), cntrlWrap(cntr.login));

authRouter.post("/logout", auth, cntrlWrap(cntr.logout));

module.exports = authRouter;
