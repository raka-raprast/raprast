import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const askChatbot = async (question: string) => {
  try {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const response = await api.post('/cv-chat', { question });
    return response.data;
  } catch (error) {
    console.error('Error posting data to chatbot:', error);
    throw error;
  }
};
