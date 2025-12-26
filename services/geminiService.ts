
import { GoogleGenAI, Type } from "@google/genai";
import { AppBlueprint, GeneratedCode } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateAppBlueprint = async (prompt: string): Promise<AppBlueprint> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Design a comprehensive technical application blueprint for the following idea: ${prompt}. 
    Provide a professional architecture, clear data models, feature set, and detailed infrastructure requirements.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          appName: { type: Type.STRING },
          tagline: { type: Type.STRING },
          description: { type: Type.STRING },
          targetAudience: { type: Type.STRING },
          techStack: {
            type: Type.OBJECT,
            properties: {
              frontend: { type: Type.STRING },
              backend: { type: Type.STRING },
              database: { type: Type.STRING },
              auth: { type: Type.STRING },
            },
            required: ["frontend", "backend", "database", "auth"]
          },
          infrastructure: {
            type: Type.OBJECT,
            properties: {
              ram: { type: Type.STRING },
              cpu: { type: Type.STRING },
              storage: { type: Type.STRING },
              scalingStrategy: { type: Type.STRING },
            },
            required: ["ram", "cpu", "storage", "scalingStrategy"]
          },
          features: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                priority: { type: Type.STRING },
              },
              required: ["name", "description", "priority"]
            }
          },
          dataModels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                fields: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      type: { type: Type.STRING },
                      description: { type: Type.STRING },
                    }
                  }
                }
              }
            }
          },
          pages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                route: { type: Type.STRING },
                components: { type: Type.ARRAY, items: { type: Type.STRING } },
                purpose: { type: Type.STRING },
              }
            }
          },
          colorPalette: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING },
              secondary: { type: Type.STRING },
              accent: { type: Type.STRING },
              background: { type: Type.STRING },
            }
          }
        },
        required: ["appName", "tagline", "description", "targetAudience", "techStack", "infrastructure", "features", "dataModels", "pages", "colorPalette"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as AppBlueprint;
  } catch (error) {
    throw new Error("Could not generate blueprint.");
  }
};

export const generateAppCode = async (blueprint: AppBlueprint): Promise<GeneratedCode> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Based on this application blueprint: ${JSON.stringify(blueprint)}, generate a set of starter code files. 
    Include:
    1. A React component for the main dashboard.
    2. A Tailwind CSS configuration or a global CSS file using the color palette.
    3. An SQL or Prisma schema for the data models.
    4. A Node.js/Express API route for the primary feature.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          files: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                language: { type: Type.STRING },
                content: { type: Type.STRING }
              },
              required: ["name", "language", "content"]
            }
          }
        },
        required: ["files"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as GeneratedCode;
  } catch (error) {
    throw new Error("Failed to convert blueprint to code.");
  }
};
