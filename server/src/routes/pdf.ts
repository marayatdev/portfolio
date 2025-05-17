import { Router } from "express";
import { PdfController } from "@/controllers/PdfController";

const router = Router();
const pdfController = new PdfController();

router.get("/", pdfController.getPdf);

export default router;
