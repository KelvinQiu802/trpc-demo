import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { db } from "./db";
import cors from "cors";

const appRouter = router({
    userList: publicProcedure.
        query(async () => {
            const users = await db.user.findMany(); // Data Access Layer
            return users;
        }),
    userById: publicProcedure
        .input(z.string())
        .query(async (opts) => {
            const { input } = opts;
            const user = await db.user.findById(input);
            return user;
        }),
    userCreate: publicProcedure
        .input(z.object({ name: z.string("必须是字符串!") }))
        .mutation(async (opts) => {
            const { input } = opts;
            const user = await db.user.create(input);
            return user;
        })
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    middleware: cors({
        origin: "http://localhost:5173"
    })
})

server.listen(3000);
console.log("Server is running on port 3000");
