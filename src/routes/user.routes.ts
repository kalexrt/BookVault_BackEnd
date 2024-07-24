import express from "express";

import {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
} from "../controller/user.controller";

const router = express();

router.route("/")
    .get(getUsers)
    .post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export default router;
