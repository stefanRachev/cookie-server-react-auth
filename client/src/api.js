
const API_URL = 'http://localhost:5000'; 

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const register = async (credentials) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/data`);
  if (!response.ok) throw new Error('Data fetch failed');
  return response.json();
};
