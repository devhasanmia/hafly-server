import mongoose from "mongoose";
import http from "http";
import app from "./app";
import config from "./app/config";
import { initSocket } from "./app/config/socket";

const PORT = config.app.port;
let server: http.Server | null = null;

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(config.database.uri as string);
    console.log("✅ Database connected successfully");

    // HTTP server বানালাম
    server = http.createServer(app);

    // Socket.IO attach করলাম
    initSocket(server);

    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

// Graceful shutdown
const shutdown = async () => {
  console.log("\n🛑 Shutting down gracefully...");
  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server!.close((err) => (err ? reject(err) : resolve()));
      });
      console.log("🔒 Server closed");
    }
    await mongoose.disconnect();
    console.log("📦 MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("❗Error during shutdown", err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (reason) => {
  console.error("🔴 Unhandled Rejection:", reason);
  shutdown();
});
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

main();
