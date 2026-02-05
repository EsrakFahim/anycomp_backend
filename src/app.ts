import "dotenv/config";
import express from "express";
import cors from "cors";
import specialistRoutes from "./routes/specialist.routes";
import { AppDataSource } from "./data-source";

const app = express();

app.use(cors({
      origin: [
            "https://anycomp-ecru.vercel.app/",
            "https://anycomp-ecru.vercel.app",
      ],
      credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", specialistRoutes);
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: "Internal Server Error" });
});

app.get("/", (_req, res) => {
      res.send({
            message: "Welcome to the AnyComp Backend API",
            uptime: new Date().toISOString(),
      });
});

const PORT = 5000;

// 🔥 THIS is what you were missing
AppDataSource.initialize()
      .then(() => {
            console.log("Database connected");

            app.listen(PORT, () => {
                  console.log(`Server running on http://localhost:${PORT}`);
            });
      })
      .catch((err) => {
            console.error("Database connection failed", err);
      });