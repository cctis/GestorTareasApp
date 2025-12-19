import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";

import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";

interface EditTaskForm {
  title: string;
  description?: string;
  dueDate?: string;
  stateId: number;
  rowVersion: string;
}

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loadTask,
    updateTask,
    loadStates,
    states,
    error,
  } = useTasks();

  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<EditTaskForm>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const taskId = Number(id);

    const loadData = async () => {
      const task = await loadTask(taskId);
      await loadStates();

      if (task) {
        reset({
          title: task.Title,
          description: task.Description ?? "",
          dueDate: task.DueDate
            ? task.DueDate.substring(0, 10)
            : "",
          stateId: task.StateId,
          rowVersion: task.RowVersion,
        });
      }

      setLoading(false);
    };

    loadData();
  }, [id]); 

  const onSubmit = async (data: EditTaskForm) => {
    if (!id) return;

    const payload = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate
        ? new Date(data.dueDate).toISOString()
        : null,
      stateId: data.stateId,
      rowVersion: data.rowVersion,
    };

    const res = await updateTask(Number(id), payload);
    if (res.statusResponse) navigate("/");
  };

  if (loading) {
    return (
      <Layout>
        <Stack alignItems="center" mt={6}>
          <CircularProgress />
          <Typography mt={2}>Cargando tarea...</Typography>
        </Stack>
      </Layout>
    );
  }

  return (
    <Layout>
      <Paper sx={{ maxWidth: 520, mx: "auto", p: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
          Editar tarea
        </Typography>

        {error && <Alert severity="error">{JSON.stringify(error)}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <input type="hidden" {...register("rowVersion")} />

            <TextField label="Título" fullWidth {...register("title")} />
            <TextField label="Descripción" fullWidth multiline rows={4} {...register("description")} />
            <TextField label="Fecha límite" type="date" InputLabelProps={{ shrink: true }} {...register("dueDate")} />

            <Controller
              name="stateId"
              control={control}
              render={({ field }) => (
                <TextField select label="Estado" fullWidth {...field}>
                  {states.map((s) => (
                    <MenuItem key={s.Id} value={s.Id}>
                      {s.Name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Button type="submit" variant="contained">
              Guardar cambios
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default EditTaskPage;
