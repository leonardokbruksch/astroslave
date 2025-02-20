"use server";
import { createClient } from "../utils/supabase/server";
import { zodResponseFormat } from 'openai/helpers/zod';

import OpenAI from "openai";
import { chatGptResponseSchema, HoroscopeRow, horoscopeRowSchema } from "./types";
const openai = new OpenAI();

// 1 hour
const SHOULD_REFETCH_TIME_SECONDS = 60 * 60;

export const getHoroscopes = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("horoscope").select("*");
  
    if (error || data?.length === 0) {
      console.error("Error fetching horoscopes:", error);
      return [];
    }

   const createdAtString = String(data[0].created_at);
   const createdAt = Math.floor(new Date(createdAtString).getTime() / 1000);
    const now = Date.now() / 1000;
   if (now - createdAt > SHOULD_REFETCH_TIME_SECONDS) {
    console.log("RE RUNNING OPEN AI CALL");
    const newReadings = await fetchHoroscopeReadings();
    console.log(newReadings);

    const horoscopes = newReadings.horoscopes;

    for (const reading of horoscopes) {
      reading.created_at = new Date().toISOString();
      reading.id = reading.id.toLowerCase();
    }

    // insert rows into supabase
    console.log("INSERTING NEW HOROSCOPES", horoscopes);
    const { error } = await supabase.from("horoscope").upsert(horoscopes, { onConflict: "id" });
    if (error) console.error("Supabase insert error:", error);

    return horoscopes;
   } else {
    console.log(data);
    return data as HoroscopeRow[];
   }
}

export const fetchHoroscopeReadings = async () => {
  console.log("FETCHING NEW HOROSCOPES");
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a darkly humorous AI astrologer for a website called Astro Slave. Your goal is to generate sarcastic, witty, and cynical horoscope readings for all twelve zodiac signs. These readings should be formatted as a list, each containing an ID (a string with the sign name), a timestamp (created_at) with the current timestamp UTC in seconds, and a description filled with corporate dread, existential humor, or general irony. Keep it fun, relatable, and slightly unhinged.",
      },
      {
        role: "user",
        content: "Generate a new set of darkly humorous horoscope readings for all twelve zodiac signs in JSON format.",
      },
    ],
    response_format: zodResponseFormat(chatGptResponseSchema, "description"),
  });
  return completion.choices[0].message.parsed;
};