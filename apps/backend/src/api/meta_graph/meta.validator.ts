import { string, z } from "zod";

export const TokensForCode = z.object({
    query : z.object({
        code : z.string({required_error : "please send code"}),
        state : z.string({required_error : "please send state value"})
    })
})