import { Router } from "express";
import usersController from "./user.controller.js";
import authenticate from "../../middleware/authenticate.js";
import rateLimiters from "../../middleware/rateLimiters.js";
const usersRouter = Router();
usersRouter.post("/register", rateLimiters, usersController.register);
usersRouter.get("/get", usersController.getUsers);
usersRouter.get("/get/:userId", usersController.getUserById);

usersRouter.delete("/delete/:userId", rateLimiters, usersController.deleteUser);
usersRouter.put("/edit/:userId", rateLimiters, usersController.updateUser);
usersRouter.post("/login", rateLimiters, usersController.loginUser);

usersRouter.post(
  "/forget-password",
  rateLimiters,
  usersController.forgotPassword
);
usersRouter.post(
  "/confirm-otp",

  rateLimiters,
  usersController.confirmOtp
);
usersRouter.post(
  "/new-password",

  rateLimiters,
  usersController.newPassword
);

export default usersRouter;
