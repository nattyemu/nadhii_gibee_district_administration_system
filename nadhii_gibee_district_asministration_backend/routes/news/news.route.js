import express from "express";
import newsArticleController from "./news.controller.js";

import rateLimiters from "../../middleware/rateLimiters.js";
import authenticate from "../../middleware/authenticate.js";

const router = express.Router();

// Public routes
router.get("/updated", newsArticleController.getUpdatedArticles);
router.get("/", newsArticleController.getArticles);
router.get("/:id", newsArticleController.getArticle);

// Protected routes
router.post(
  "/",
  authenticate,
  rateLimiters,
  newsArticleController.createArticle
);
router.put(
  "/:id",
  authenticate,
  rateLimiters,
  newsArticleController.updateArticle
);

router.delete(
  "/:id",
  authenticate,
  rateLimiters,
  newsArticleController.deleteArticle
);

export default router;
