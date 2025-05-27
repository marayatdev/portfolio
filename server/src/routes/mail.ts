import { MailController } from "@/controllers/MailController";
import { Router } from "express";

const router = Router();
const mailController = new MailController();

router.post("/", mailController.sendMail);

export default router;
