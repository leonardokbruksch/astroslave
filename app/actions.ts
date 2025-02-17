"use server";
import { createClient } from "../utils/supabase/server";

export const getHoroscopes = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("horoscope").select("*");
  
    if (error) {
      console.error("Error fetching horoscopes:", error);
      return [];
    }
    
    console.log(data);
    return data as HoroscopeRow[];
}