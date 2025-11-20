
import { GoogleGenAI, Modality } from "@google/genai";

export const generateSpeech = async (text: string, voiceName: string, style: string): Promise<string> => {
  // Assume process.env.API_KEY is available in the environment
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Create the configuration object
  // We use 'any' here to allow flexible assignment of systemInstruction depending on SDK version nuances,
  // but logically it belongs in the config.
  const config: any = {
    responseModalities: [Modality.AUDIO],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: voiceName },
      },
    },
  };

  // FIX: Move style to systemInstruction. 
  // This separates the "instruction" (how to speak) from the "content" (what to speak).
  // This prevents the model from reading the style description aloud (e.g., "Female voice...").
  if (style.trim()) {
    config.systemInstruction = `Read the text with the following style: "${style.trim()}". Do NOT read the style description itself, only the text provided in the prompt.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }], // Only send the actual text in the contents
      config: config,
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("Failed to generate audio. The response did not contain audio data.");
    }
    
    return base64Audio;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(`Failed to generate speech. Please check your API key and network connection. Details: ${error instanceof Error ? error.message : String(error)}`);
  }
};
