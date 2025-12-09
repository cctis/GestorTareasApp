import axios from "axios";

interface ApiResult<T> {
  statusResponse: boolean;
  error: any;
  data?: T | null;
}


const API_URL = "https://localhost:7230";
const USER = "9gk7sPAj9hE=";
const PASSWORD = "NsX8xEav35+BvurRn3x2bANt7lnq2RJ6odp/zr3HQ+k=";



let mainToken: string = "";
const TOKEN_EXPIRATION_TIME = 3600000; 

setInterval(() => {
  mainToken = "";
}, TOKEN_EXPIRATION_TIME);

const getToken = async () => {
    const result = { statusResponse: true, error: null, token: null };
    if (!mainToken) {
        const formData = { User: USER, Password: PASSWORD };
        try {
            const response = await axios.post(`${API_URL}/api/Token/Authentication`, formData, {
                headers: { "Content-Type": "application/json; charset=utf-8" }
            });
            mainToken = response.data.token;
            result.token = response.data.token;
        } catch (error) {
            result.statusResponse = false;
           
           
        }
        return result.token;
    } else {
        return mainToken;
    }
};



export const GetTasks = async (): Promise<ApiResult<any[]>> => {
  const result: ApiResult<any[]> = { statusResponse: true, error: null, data: [] };

  const token = await getToken();
  if (!token) return { statusResponse: false, error: "Token inválido", data: [] };

  try {
    const response = await axios.get<any[]>(`${API_URL}/api/Tasks`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

   
    result.data = response.data.map((t) => ({
      id: t.Id,
      title: t.Title,
      description: t.Description,
      state: t.State?.Name ?? "", 
      createdAt: t.CreatedAt,
      updatedAt: t.UpdatedAt
    }));

  } catch (error: any) {
    result.statusResponse = false;
    result.error = error.message;
  }

  return result;
};



export const CreateTask = async (task: any): Promise<ApiResult<any>> => {
  const result: ApiResult<any> = { statusResponse: true, error: null, data: null };

  const token = await getToken();
  if (!token) return { statusResponse: false, error: "Token inválido", data: null };

  try {
    const response = await axios.post(`${API_URL}/api/Tasks`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });

    result.data = response.data.result;

  } catch (error: any) {
    result.statusResponse = false;
    result.error = error.response?.data || error.message;
  }

  return result;
};


export const GetTaskById = async (id: number): Promise<ApiResult<any>> => {
  const result: ApiResult<any> = { statusResponse: true, error: null, data: null };

  const token = await getToken();
  if (!token) return { statusResponse: false, error: "Token inválido", data: null };

  try {
    const response = await axios.get(`${API_URL}/api/Tasks?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    result.data = response.data;

  } catch (error: any) {
    result.statusResponse = false;
    result.error = error.response?.data || error.message;
  }

  return result;
};


export const UpdateTask = async (id: number, task: any): Promise<ApiResult<any>> => {
  const result: ApiResult<any> = { statusResponse: true, error: null, data: null };

  const token = await getToken();
  if (!token) return { statusResponse: false, error: "Token inválido", data: null };

  try {
    const response = await axios.put(
      `${API_URL}/api/Tasks/${id}`,
      task,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    result.data = response.data;

  } catch (error: any) {
    result.statusResponse = false;
    result.error = error.response?.data || error.message;
  }

  return result;
};



export const DeleteTask = async (id: number): Promise<ApiResult<any>> => {
  const result: ApiResult<any> = { statusResponse: true, error: null, data: null };

  const token = await getToken();
  if (!token) return { statusResponse: false, error: "Token inválido", data: null };

  try {
    const response = await axios.delete(`${API_URL}/api/Tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    result.data = response.data ?? null;

  } catch (error: any) {
    result.statusResponse = false;
    result.error =
      error.response?.data?.MessageResult ||
      error.message ||
      "Error desconocido";
  }

  return result;
};


export const GetStates = async (): Promise<ApiResult<any[]>> => {
  const result: ApiResult<any[]> = { statusResponse: true, error: null, data: [] };

  const token = await getToken();
  if (!token) return { statusResponse: false, error: "Token inválido", data: [] };

  try {
    const response = await axios.get<any[]>(`${API_URL}/api/States`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

   
    result.data = response.data.map((t) => ({
      Id:t.Id,
      Name: t.Name,
    }));

  } catch (error: any) {
    result.statusResponse = false;
    result.error = error.message;
  }

  return result;
};

export const CreateStates = async (states: any): Promise<ApiResult<any>> => {
  const result: ApiResult<any> = { statusResponse: true, error: null, data: null };

  const token = await getToken();
  if (!token) return { statusResponse: false, error: "Token inválido", data: null };

  try {
    const response = await axios.post(`${API_URL}/api/States`, states, {
      headers: { Authorization: `Bearer ${token}` },
    });

    result.data = response.data.result;

  } catch (error: any) {
    result.statusResponse = false;
    result.error = error.response?.data || error.message;
  }

  return result;
};

export const DeleteState = async (id: number): Promise<ApiResult<any>> => {
  const result: ApiResult<any> = { statusResponse: true, error: null, data: null };

  const token = await getToken();
  if (!token) return { statusResponse: false, error: "Token inválido", data: null };

  try {
    const response = await axios.delete(`${API_URL}/api/States/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    result.data = response.data ?? null;

  } catch (error: any) {
    result.statusResponse = false;
    result.error =
      error.response?.data?.MessageResult ||
      error.message ||
      "Error desconocido";
  }

  return result;
};