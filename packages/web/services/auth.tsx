const SESSION_URL = `${process.env.API_URL}/session`;
const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'user';

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  return true;
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return token;
};
export const setUser = (user) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  return true;
};

export const getUser = () => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  if (!user) {
    return false;
  }
  return JSON.parse(user);
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};

export const fetchUser = async () => {
  try {
    const token = getToken();
    const response = await fetch(SESSION_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json();

    if (!user.userId) {
      return false;
    }

    setUser(user);
    return user;
  } catch (error) {
    console.error('Unable to fetch user with the session token', error);
  }
};

export const getUserInfo = async () => {
  // try getting from local storage
  let user = getUser();
  // if not available, fetch fresh from backend
  if (!user) {
    user = await fetchUser();
  }
  return user;
};

export const login = async (token: string) => {
  setToken(token);
  const user = await fetchUser();
  return user;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  return true;
};
