import { Server as IOServer } from "socket.io";
import type { Server as HTTPServer } from "http";

// userId -> Set<socketIds>
const userSocketMap = new Map<string, Set<string>>();

// socket.io instance কে export করার জন্য variable
let io: IOServer;

export function initSocket(server: HTTPServer) {
  io = new IOServer(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Socket connected:", socket.id);

    const userId =
      (socket.handshake.auth?.userId as string) ||
      (socket.handshake.query.userId as string);

    if (userId) {
      if (!userSocketMap.has(userId)) userSocketMap.set(userId, new Set());
      userSocketMap.get(userId)!.add(socket.id);
    }

    // সকল ক্লায়েন্টকে Online Users পাঠানো
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
      if (userId && userSocketMap.has(userId)) {
        const set = userSocketMap.get(userId)!;
        set.delete(socket.id);
        if (set.size === 0) userSocketMap.delete(userId);
      }
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    });
  });

  return io;
}

// নির্দিষ্ট userId এর সব socketId বের করার helper
export function getReceiverSocketIds(userId: string): string[] {
  return Array.from(userSocketMap.get(userId) ?? []);
}

// project-wide import করার জন্য export করা হচ্ছে
export { io, userSocketMap };
