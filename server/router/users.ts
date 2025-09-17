import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
    getUser: publicProcedure.
        query((opts) => {
            const { ctx } = opts;
            console.log(ctx.isAdmin);
            return {
                id: 1,
                name: "Kelvin Qiu"
            };
        }),
});