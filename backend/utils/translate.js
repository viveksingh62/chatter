const axios = require("axios");

async function translateText(text, targetLang, sourceLang) {
  try {
    const response = await axios.get(
      "https://api.mymemory.translated.net/get",
      {
        params: {
          q: text,
          langpair: `${sourceLang}|${targetLang}`,
          de: "easyvivek3@example.com",
        },
        headers: {
          "User-Agent": "VocaChat/1.0",
        },
        timeout: 8000,
      }
    );

    const translated =
      response.data?.responseData?.translatedText;

    // ❌ Translation failed
    if (!translated || translated === "INVALID LANGUAGE PAIR") {
      return null;
    }

    // ❌ MyMemory sometimes echoes original text
    if (translated.trim() === text.trim()) {
      return null;
    }

    return translated;
  } catch (error) {
    console.log("MyMemory Error:", error.message);
    return null;
  }
}

module.exports = translateText;
