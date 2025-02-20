import { z } from "zod";

export const horoscopeRowSchema = z.object({
    id: z.string(),
    created_at: z.string(),
    description: z.string(),
});

export type HoroscopeRow = z.infer<typeof horoscopeRowSchema>;

export const chatGptResponseSchema = z.object({
    horoscopes: z.array(horoscopeRowSchema),
});

export type ChatGptResponse = z.infer<typeof chatGptResponseSchema>;


