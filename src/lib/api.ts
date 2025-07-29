import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ITask, ICreateTaskDataType, IUpdateTaskDataType } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 segundos
    });

    // Interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // eslint-disable-next-line no-console
        console.error('API Error:', error);
        if (error.response) {
          // Server response error
          throw new Error(
            `API request failed: ${error.response.status} ${error.response.statusText}`,
          );
        } else if (error.request) {
          // Network error
          throw new Error('Network error: Unable to connect to the server');
        } else {
          // Other error
          throw new Error('An unexpected error occurred');
        }
      },
    );
  }

  // Get all tasks
  async getTasks(): Promise<ITask[]> {
    const response: AxiosResponse<ITask[]> = await this.client.get('/tasks');

    return response.data;
  }

  // Get a task by id
  async getTask(id: string): Promise<ITask> {
    const response: AxiosResponse<ITask> = await this.client.get(
      `/tasks/${id}`,
    );

    return response.data;
  }

  // Create a new task
  async createTask(data: ICreateTaskDataType): Promise<ITask> {
    const response: AxiosResponse<ITask> = await this.client.post(
      '/tasks',
      data,
    );

    return response.data;
  }

  // Update a task
  async updateTask(id: string, data: IUpdateTaskDataType): Promise<ITask> {
    const response: AxiosResponse<ITask> = await this.client.put(
      `/tasks/${id}`,
      data,
    );

    return response.data;
  }

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    await this.client.delete(`/tasks/${id}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
