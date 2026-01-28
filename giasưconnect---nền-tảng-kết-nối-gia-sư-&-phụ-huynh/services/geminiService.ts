
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async getTutorAdvice(query: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Với tư cách là một chuyên gia tư vấn giáo dục, hãy trả lời câu hỏi sau của phụ huynh/gia sư một cách ngắn gọn và hữu ích: ${query}`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Xin lỗi, tôi gặp sự cố khi kết nối. Vui lòng thử lại sau.";
    }
  },

  async suggestTutorBio(details: { subjects: string[], experience: string, style: string }) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Hãy viết một đoạn giới thiệu bản thân hấp dẫn (bio) cho một gia sư dạy các môn: ${details.subjects.join(', ')}. Kinh nghiệm: ${details.experience}. Phong cách dạy: ${details.style}. Viết bằng tiếng Việt chuyên nghiệp, tin cậy.`,
        config: {
          temperature: 0.8,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  }
};
