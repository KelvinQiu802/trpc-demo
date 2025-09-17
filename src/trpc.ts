import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "../server/index";

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        loggerLink(),
        httpBatchLink({
            url: "http://localhost:3000/trpc/api/"
        })
    ]
})