// src/services/api.js

/**
 * A stub for translating text via an External API.
 * You can inject your own LLM API logic (e.g., fetch request) directly into this function.
 * 
 * @param {string} text - The input text provided by the user.
 * @param {string} targetLanguage - The language to translate the text into.
 * @returns {Promise<string>} The translated text result.
 */
export const translateText = async (text, targetLanguage) => {
  const response = await fetch('http://localhost:8080/v1/translator/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetLanguage: targetLanguage, text: text })
  });
  const data = await response.json();
  console.log(data);
  return data.translatedText;
};
