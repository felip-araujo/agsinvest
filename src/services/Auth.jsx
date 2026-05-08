export function getToken() {
  return localStorage.getItem("token");
}

export function getAccount() {
  const account = localStorage.getItem("account");

  if (!account) {
    return null;
  }

  return JSON.parse(account);
}

export function isAuthenticated() {
  const token = getToken();

  return !!token;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("account");
}