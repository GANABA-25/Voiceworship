import { Router } from "express";
import bibleController from "./bible.controller.ts";

const router = Router();

router.post("/getPassage", bibleController.getPassage);

export default router;
