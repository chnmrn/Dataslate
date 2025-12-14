const API_URL = "http://localhost:5027/api"; // adjust as needed

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(email: string, password: string, userName: string) {
  const res = await fetch(`${API_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username: userName }), // backend expects a "username"
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    // If it is JSON, parse; if not, get text
    if (contentType?.includes("application/json")) {
      const errorJson = await res.json();
      throw new Error(errorJson.message || "Register failed");
    } else {
      const errorText = await res.text();
      throw new Error(errorText);
    }
  }

  // if successful, parse response accordingly
  if (contentType?.includes("application/json")) {
    return res.json();
  } else {
    return { message: await res.text() };
  }
}


// Fetch projects using the provided token
export async function getProjects(token: string) {
  const res = await fetch(`${API_URL}/Projects`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error fetching projects");
  return res.json();
}

export async function getTasks(token: string) {
  const res = await fetch(`${API_URL}/Tasks`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error fetching tasks");
  return res.json();
}



