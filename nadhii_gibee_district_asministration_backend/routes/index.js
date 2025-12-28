import { Router } from "express";
import usersRouter from "./user/user.route.js";
import administratorRouter from "./administrator/administrator.route.js";
import newsArticleRouter from "./news/news.route.js";
import cabineRouter from "./cabine/cabine.route.js";
import sectorRouter from "./sector/sector.route.js";
import uploadRouter from "./upload/upload.route.js";
import kebeleRouter from "./kebele/kebele.route.js";
import dashboardRoutes from "./dashboard/dashboard.route.js";

const appRouter = Router();

// REMOVED static file serving from here since it's now in app.js
// Static files are now served directly from the main app

// API routes
appRouter.use("/user", usersRouter);
appRouter.use("/administrator", administratorRouter);
appRouter.use("/news-article", newsArticleRouter);
appRouter.use("/cabine", cabineRouter);
appRouter.use("/upload", uploadRouter);
appRouter.use("/sector", sectorRouter);
appRouter.use("/kebele", kebeleRouter);
appRouter.use("/dashboard", dashboardRoutes);

export default appRouter;
