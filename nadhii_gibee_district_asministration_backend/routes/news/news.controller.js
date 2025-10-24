import { NewsArticle } from "../../models/NewsArticle.model.js";
import newsSchema from "./news.schema.js";
const transformArticleData = (article) => {
  const articleData = article.toObject ? article.toObject() : article;
  return {
    id: articleData._id,
    title: articleData.title,
    excerpt: articleData.excerpt,
    content: articleData.content,
    type: articleData.type,
    category: articleData.category,
    image: articleData.image,
    date: articleData.date,
    author: articleData.author,
    location: articleData.location,
    tags: articleData.tags,
    featured: articleData.featured,
    urgent: articleData.urgent,
    createdAt: articleData.createdAt,
    updatedAt: articleData.updatedAt,
  };
};
const newsArticleController = {
  // CREATE - Create new news article
  createArticle: async (req, res) => {
    try {
      const validatedData = newsSchema.create.parse(req.body);

      // Convert date string to Date object if needed
      if (typeof validatedData.date === "string") {
        validatedData.date = new Date(validatedData.date);
      }

      const newArticle = new NewsArticle(validatedData);
      await newArticle.save();

      return res.status(201).json({
        success: true,
        message: "Article created successfully",
        data: transformArticleData(newArticle),
      });
    } catch (error) {
      if (error.name === "ZodError") {
        console.log(error);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Create article error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get all articles with filtering and pagination
  getArticles: async (req, res) => {
    try {
      const validatedQuery = newsSchema.query.parse(req.query);

      // Build filter object
      const filter = {};

      if (validatedQuery.type) filter.type = validatedQuery.type;
      if (validatedQuery.category) filter.category = validatedQuery.category;
      if (validatedQuery.featured)
        filter.featured = validatedQuery.featured === "true";
      if (validatedQuery.urgent)
        filter.urgent = validatedQuery.urgent === "true";

      // Text search
      if (validatedQuery.search) {
        filter.$text = { $search: validatedQuery.search };
      }

      const articles = await NewsArticle.find(filter)
        .sort({ date: -1, createdAt: -1 })
        .select("-__v");

      // Transform all articles using the helper function
      const transformedArticles = articles.map((article) =>
        transformArticleData(article)
      );

      return res.status(200).json({
        success: true,
        message: "Articles retrieved successfully",
        data: transformedArticles,
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Get articles error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get single article by ID
  getArticle: async (req, res) => {
    try {
      const validatedParams = newsSchema.byId.parse(req.params);

      const article = await NewsArticle.findById(validatedParams.id).select(
        "-__v"
      );

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Article retrieved successfully",
        data: transformArticleData(article),
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Get article error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  // READ - Get recently updated articles
  getUpdatedArticles: async (req, res) => {
    try {
      // Find all articles that have been updated (updatedAt != createdAt)
      const updatedArticles = await NewsArticle.find({
        $expr: { $ne: ["$createdAt", "$updatedAt"] },
      })
        .sort({ updatedAt: -1 })
        .select("-__v");

      if (!updatedArticles.length) {
        return res.status(200).json({
          success: true,
          message: "No updated articles found",
          data: [],
        });
      }

      const transformed = updatedArticles.map((article) =>
        transformArticleData(article)
      );

      return res.status(200).json({
        success: true,
        message: "Updated articles retrieved successfully",
        data: transformed,
      });
    } catch (error) {
      console.error("Get updated articles error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // UPDATE - Update article
  updateArticle: async (req, res) => {
    try {
      const validatedParams = newsSchema.byId.parse(req.params);
      const validatedData = newsSchema.update.parse(req.body);

      // Convert date string to Date object if needed
      if (validatedData.date && typeof validatedData.date === "string") {
        validatedData.date = new Date(validatedData.date);
      }

      // Prepare update object
      const updateData = { ...validatedData };

      // If tags are provided in the update, replace the entire array
      // If tags are not provided, they will not be included in the update
      if (req.body.tags !== undefined) {
        updateData.tags = validatedData.tags || [];
      }

      const updatedArticle = await NewsArticle.findByIdAndUpdate(
        validatedParams.id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
          select: "-__v",
        }
      );

      if (!updatedArticle) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Article updated successfully",
        data: transformArticleData(updatedArticle),
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Update article error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // DELETE - Delete article
  deleteArticle: async (req, res) => {
    try {
      const validatedParams = newsSchema.byId.parse(req.params);

      const article = await NewsArticle.findById(validatedParams.id);
      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      await NewsArticle.findByIdAndDelete(validatedParams.id);

      return res.status(200).json({
        success: true,
        message: "Article deleted successfully",
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Delete article error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default newsArticleController;
