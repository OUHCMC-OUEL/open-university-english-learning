import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endpoints = {
    'login': '/o/token/',
    'register': '/oauth/users/',
    'current-user': '/oauth/users/current-user/',
    'get-followers': (userId) => `/oauth/user/${userId}/followers/`,
    'get-following': (userId) => `/oauth/user/${userId}/following/`,
    'follow-user': (userId) => `/oauth/user/${userId}/follow-user/`,
    'unfollow-user': (userId) => `/oauth/user/${userId}/unfollow-user/`,
    'search-users': (searchTerm) => `/oauth/user/user-searching/?q=${searchTerm}`,
    'highlights': '/gemini/reading-app/highlight-passage/',
    'allParts': '/reading/parts/all',
    'part': (partId) => `/reading/parts/${partId}/`,
    'partRandom': '/reading/parts/random/',
    'partQuestions': (partId) => `/reading/parts/${partId}/questions/`,
    'submitQuiz': '/reading/part-histories/submit/',
    'partByType':'/reading/parts/type/',
    'check-grammar': '/gemini/writing-app/grammar/',
    'getCourse': '/elearning/course/1/',
    'getLessons': '/elearning/lessons/',
    'getLesson': (lessonId) => `/elearning/lessons/${lessonId}/`,
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