import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { getStats } from "../controller/stats.controller";

const router = express.Router();

router.route("/").get(authenticate, authorize("Librarian"), getStats);

export default router;
