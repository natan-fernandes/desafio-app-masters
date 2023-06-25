import axios from 'axios';

export const gameApi = axios.create({
  baseURL: 'https://games-test-api-81e9fb0d564a.herokuapp.com/api',
  timeout: 5000,
  headers: {'dev-email-address': 'natanfernandes@protonmail.com'}
});
