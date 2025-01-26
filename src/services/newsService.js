const API_KEY = '9aacaf2f3f3b480493653ed02a9df2ff'; // Replace with your actual API key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const categoryMapping = {
  world: 'general',
  national: 'general',
  financial: 'business',
  entertainment: 'entertainment',
  lifestyle: 'health',
  technology: 'technology',
  travel: 'general',
  sports: 'sports'
};

export const fetchNews = async (category, pageSize) => {
  try {
    const mappedCategory = categoryMapping[category] || category;
    const response = await fetch(
      `${BASE_URL}?country=us&category=${mappedCategory}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};