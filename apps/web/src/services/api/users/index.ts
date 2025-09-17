import { api } from "@/lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: CreateUser): Promise<User> {
  const response = await api.post<User>("/user", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
