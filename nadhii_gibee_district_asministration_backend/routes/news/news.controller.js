import newsSchema from "./news.schema.js";
import { db, schema } from "../../config/db.js";
import { eq, and, or, like, ne, desc } from "drizzle-orm";

const transformArticleData = (article) => {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    type: article.type,
    category: article.category,
    image: article.image,
    date: article.date,
    author: article.author,
    location: article.location,
    tags: article.tags,
    featured: article.featured,
    urgent: article.urgent,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
};

const newsArticleController = {
  // CREATE - Create new news article
  createArticle: async (req, res) => {
    try {
      // console.log("Creating article with data:", req.body);
      const validatedData = newsSchema.create.parse(req.body);

      // Ensure date is a valid Date object
      let articleDate = validatedData.date;
      if (typeof articleDate === "string") {
        articleDate = new Date(articleDate);
        if (isNaN(articleDate.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid date format",
          });
        }
      }

      const articleData = {
        title: validatedData.title,
        excerpt: validatedData.excerpt,
        content: validatedData.content || null,
        type: validatedData.type,
        category: validatedData.category,
        image: validatedData.image,
        date: articleDate,
        author: validatedData.author || null,
        location: validatedData.location || null,
        tags: validatedData.tags || [],
        featured: validatedData.featured || false,
        urgent: validatedData.urgent || false,
      };

      // console.log("Article data to insert:", articleData);

      const [result] = await db.insert(schema.newsArticles).values(articleData);
      // console.log("Insert result:", result);

      const [newArticle] = await db
        .select()
        .from(schema.newsArticles)
        .where(eq(schema.newsArticles.id, Number(result.insertId)));

      // console.log("New article created:", newArticle);

      return res.status(201).json({
        success: true,
        message: "Article created successfully",
        data: transformArticleData(newArticle),
      });
    } catch (error) {
      console.error("Create article error details:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },

  // READ - Get all articles with filtering and pagination
  getArticles: async (req, res) => {
    try {
      const validatedQuery = newsSchema.query.parse(req.query);

      // Start building query
      let query = db.select().from(schema.newsArticles);

      // Apply filters
      const conditions = [];
      if (validatedQuery.type) {
        conditions.push(eq(schema.newsArticles.type, validatedQuery.type));
      }
      if (validatedQuery.category) {
        conditions.push(
          eq(schema.newsArticles.category, validatedQuery.category)
        );
      }
      if (validatedQuery.featured !== undefined) {
        conditions.push(
          eq(schema.newsArticles.featured, validatedQuery.featured === "true")
        );
      }
      if (validatedQuery.urgent !== undefined) {
        conditions.push(
          eq(schema.newsArticles.urgent, validatedQuery.urgent === "true")
        );
      }
      if (validatedQuery.search) {
        conditions.push(
          or(
            like(schema.newsArticles.title, `%${validatedQuery.search}%`),
            like(schema.newsArticles.excerpt, `%${validatedQuery.search}%`),
            like(schema.newsArticles.content, `%${validatedQuery.search}%`)
          )
        );
      }

      // Apply conditions if any
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }

      // Sort by date descending, then createdAt descending
      const articles = await query.orderBy(
        desc(schema.newsArticles.date),
        desc(schema.newsArticles.createdAt)
      );

      const transformedArticles = articles.map((article) =>
        transformArticleData(article)
      );

      return res.status(200).json({
        success: true,
        message: "Articles retrieved successfully",
        data: transformedArticles,
      });
    } catch (error) {
      console.error("Get articles error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
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
      const id = parseInt(validatedParams.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid article ID",
        });
      }

      const [article] = await db
        .select()
        .from(schema.newsArticles)
        .where(eq(schema.newsArticles.id, id));

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
      console.error("Get article error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get recently updated articles
  getUpdatedArticles: async (req, res) => {
    try {
      const updatedArticles = await db
        .select()
        .from(schema.newsArticles)
        .where(ne(schema.newsArticles.createdAt, schema.newsArticles.updatedAt))
        .orderBy(desc(schema.newsArticles.updatedAt));

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
      const id = parseInt(validatedParams.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid article ID",
        });
      }

      // Prepare update object
      const updateData = {
        ...validatedData,
        updatedAt: new Date(),
      };

      // Handle date conversion if needed
      if (validatedData.date && typeof validatedData.date === "string") {
        const articleDate = new Date(validatedData.date);
        if (!isNaN(articleDate.getTime())) {
          updateData.date = articleDate;
        }
      }

      // If tags are provided, use them
      if (req.body.tags !== undefined) {
        updateData.tags = validatedData.tags || [];
      }

      // Update article
      await db
        .update(schema.newsArticles)
        .set(updateData)
        .where(eq(schema.newsArticles.id, id));

      // Get updated article
      const [updatedArticle] = await db
        .select()
        .from(schema.newsArticles)
        .where(eq(schema.newsArticles.id, id));

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
      console.error("Update article error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
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
      const id = parseInt(validatedParams.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid article ID",
        });
      }

      // Check if article exists
      const [article] = await db
        .select()
        .from(schema.newsArticles)
        .where(eq(schema.newsArticles.id, id));

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      // Delete article
      await db
        .delete(schema.newsArticles)
        .where(eq(schema.newsArticles.id, id));

      return res.status(200).json({
        success: true,
        message: "Article deleted successfully",
      });
    } catch (error) {
      console.error("Delete article error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default newsArticleController;
