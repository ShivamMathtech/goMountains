import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
dotenv.config();

// ----------- Define the PORT -------------
const PORT = process.env.PORT || 3000;

try {
  await connectDB();
  app.listen(PORT, () =>
    console.log(` Server running on http://localhost:${PORT}`)
  );
} catch (err) {
  console.error(" Failed to start server:", err);
  process.exit(1);
}
