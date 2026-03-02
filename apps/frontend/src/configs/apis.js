import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
    'highlights': '/gemini/reading-app/highlight-passage/',
    'allParts': '/reading/parts/all',
    'part': (partId) => `/reading/parts/${partId}/`,
    'partRandom': '/reading/parts/random/',
    'partQuestions': (partId) => `/reading/parts/${partId}/questions/`,
    'checkAnswer': (questionId) => `/reading/questions/${questionId}/check_answer/`,
    'submitQuiz': '/reading/part-histories/submit/',
    'partByType':'/reading/parts/type/',
    'check-grammar': '/gemini/writing-app/grammar/',
};

export default axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json' 
    },
    timeout: 30000
});

export const authApi = (token) => axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
    }
});