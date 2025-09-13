
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { PredictionResult, ImageFile } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const predictAgeFromImage = async (image: ImageFile): Promise<PredictionResult> => {
    try {
        const imagePart = {
            inlineData: {
                data: image.base64,
                mimeType: image.mimeType,
            },
        };

        const textPart = {
            text: `Analyze the person in this image. Predict their age as a single integer and provide a confidence score for your prediction between 0.0 and 1.0.`,
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        age: {
                            type: Type.INTEGER,
                            description: "The predicted age of the person."
                        },
                        confidence: {
                            type: Type.NUMBER,
                            description: "A confidence score from 0.0 to 1.0 for the prediction."
                        }
                    },
                    required: ["age", "confidence"]
                }
            }
        });
        
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (typeof result.age === 'number' && typeof result.confidence === 'number') {
            return result as PredictionResult;
        } else {
            throw new Error("Invalid JSON structure in API response.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get prediction from the model. Please try again.");
    }
};
