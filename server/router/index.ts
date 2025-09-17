import { adminProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { db } from "../db";
import { usersRouter } from "./users";

export const appRouter = router({
    userList: publicProcedure.
        query(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
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
        }),
    sayHi: publicProcedure
        .query(() => {
            return 'Hi';
        }),
    logToServer: publicProcedure
        .input(z.string())
        .mutation((opts) => {
            const { input } = opts;
            console.log(input);
            return true;
        }),
    users: usersRouter,
    getSecret: adminProcedure
        .query(({ ctx }) => {
            console.log(ctx.user);
            return 'Secret Data';
        })
});