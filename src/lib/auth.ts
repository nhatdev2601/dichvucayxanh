import { account } from './appwrite';

export async function login(email: string, password: string) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function checkAuth() {
  try {
    const user = await account.get();
    return !!user;
  } catch (error) {
    return false;
  }
}
