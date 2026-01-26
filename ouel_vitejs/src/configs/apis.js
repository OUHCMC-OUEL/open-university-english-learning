import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
    'getHighlights': '/geminis/reading-app/highlight-passage/',
    'getParts': '/quiz/parts/',
    'getPart': (partId) => `/quiz/parts/${partId}/`,
    'getPartRandom': '/quiz/parts/random/',
    'getPartQuestions': (partId) => `/quiz/parts/${partId}/questions/`,
    'checkAnswer': (questionId) => `/quiz/questions/${questionId}/check_answer/`,
    'submitQuiz': '/quiz/part-histories/submit/',
    'getPartByType':'/quiz/parts/type/'
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