import { Router } from "express";
import bibleController from "./bible.controller.ts";

const router = Router();

router.post("/bibles", bibleController.getAllBible);

export default router;
