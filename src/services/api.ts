export const API_URL = "http://localhost:8080/api";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Error en la solicitud";

    try {
      const data = await response.json();
      errorMessage = data.message || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  return response.json();
}
