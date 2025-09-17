import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./router/index";
import { createContext } from "./context";

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    basePath: "/trpc/api/",
    middleware: cors({
        origin: "http://localhost:5173"
    }),
    createContext
})

server.listen(3000);
console.log("Server is running on port 3000");
