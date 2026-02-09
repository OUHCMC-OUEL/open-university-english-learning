import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
    'getHighlights': '/gemini/reading-app/highlight-passage/',
    'getAllParts': '/reading/parts/all',
    'getPart': (partId) => `/reading/parts/${partId}/`,
    'getPartRandom': '/reading/parts/random/',
    'getPartQuestions': (partId) => `/reading/parts/${partId}/questions/`,
    'checkAnswer': (questionId) => `/reading/questions/${questionId}/check_answer/`,
    'submitQuiz': '/reading/part-histories/submit/',
    'getPartByType':'/reading/parts/type/',
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