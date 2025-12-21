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

// Fetch tasks using the provided token
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

// Create a new Project
export async function createProject(project: any, token: string) {
  const res = await fetch(`${API_URL}/Projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Error creating project");
  }

  return res.json();
}

// Create a new Task
export async function createTask(task: any, token: string) {
  const res = await fetch(`${API_URL}/Tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Error creating task");
  }

  return res.json();
}

// Update a Project
export async function updateProject(id: number, project: any, token: string) {
  return fetch(`${API_URL}/Projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
}

// Update a Task
export async function updateTask(id: number, task: any, token: string) {
  const res = await fetch(`${API_URL}/Tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Error updating task");
  }
}

// Delete a project
export async function deleteProject(id: number, token: string) {
  return fetch(`${API_URL}/Projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Delete a Task
export async function deleteTask(id: number, token: string) {
  const res = await fetch(`${API_URL}/Tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}








