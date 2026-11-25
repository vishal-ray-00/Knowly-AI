import Router from "express";
import { protect } from "../middleware/auth.middleware.js";
import { uploadDocument,getDocument,getDocuments,deleteDocument } from "../controllers/document.controller.js";
import { uploadpdfFile } from "../middleware/upload.middleware.js";
import { searchDocument } from "../controllers/search.controller.js";

const router = Router();

router.use(protect);

router.post("/upload", uploadpdfFile, uploadDocument);
router.get("/",getDocuments);
router.get("/:id", getDocument);
router.post("/:id/search", searchDocument);
router.delete("/:id", deleteDocument);

export default router;