import { useState } from "react";
import { 
  GetTasks, 
  CreateTask, 
  GetTaskById, 
  UpdateTask, 
  DeleteTask,
  CreateStates,
  GetStates,
  DeleteState 
} from "../utils/actions";



export const useTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [states, setStates] = useState<any[]>([]);

  const loadTasks = async () => {
      setLoading(true);
      const res = await GetTasks();
      if (res.statusResponse) setTasks(res.data || []);
      else setError(res.error);
      setLoading(false);
  };

  const loadTask = async (id: number) => {
      setLoading(true);
      const res = await GetTaskById(id); 
      if (!res.statusResponse) setError(res.error);
      setLoading(false);
      return res.data;
  };

  const createTask = async (task: any) => {
      const res = await CreateTask(task);
      if (!res.statusResponse) setError(res.error);
      else await loadTasks();
      return res;
  };

  const updateTask = async (id:number,task: any) => {
      const res = await UpdateTask(id,task);
      if (!res.statusResponse) setError(res.error);
      else await loadTasks();
      return res;
  };

  const deleteTaskById = async (id: number) => {
      const res = await DeleteTask(id); 
      if (!res.statusResponse) setError(res.error);
      else await loadTasks();
      return res;
  };

   const createStates = async (states: any) => {
      const res = await CreateStates(states);
      if (!res.statusResponse) setError(res.error);
      else await loadStates();
      return res;
  };

    const loadStates = async () => {
      setLoading(true);
      const res = await GetStates();
      console.log(res.data)
      if (res.statusResponse) setStates(res.data || []);
      else setError(res.error);
      setLoading(false);
  };

   const deleteStateById = async (id: number) => {
    console.log(id);
      const res = await DeleteState(id); 
      if (!res.statusResponse) setError(res.error);
      else await loadStates();
      return res;
  };

  return {
      tasks,
      states,
      loading,
      error,
      loadTasks,
      loadTask,
      createTask,
      updateTask,
      deleteTaskById,
      createStates,
      loadStates,
      deleteStateById,
      
  };
};
