import "dotenv/config";
import express from "express";
import cors from "cors";

import AuthRoutes from "./modules/auth/auth.routes.ts";
import BibleController from "./modules/bible/bible.routes.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/auth", AuthRoutes);
app.use("/bible", BibleController);

const PORT = process.env.PORT || 29225;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
