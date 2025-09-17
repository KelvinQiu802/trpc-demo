import { initTRPC, TRPCError } from "@trpc/server";
import { createContext } from "./context";

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAdminMiddlware = t.middleware(({ ctx, next }) => {
    if (!ctx.isAdmin) throw new TRPCError({ code: 'UNAUTHORIZED' })
    // 如果已认证，则继续执行,并且添加到ctx中
    return next({
        ctx: {
            user: {
                id: 10,
                name: 'Kelvin Qiu Authenticated'
            }
        }
    })
})

export const adminProcedure = t.procedure.use(isAdminMiddlware);
