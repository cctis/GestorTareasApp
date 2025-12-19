
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { useEffect } from "react";

const CreateTaskPage = () => {
  const { createTask, error, states, loadStates } = useTasks();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
  loadStates();
}, []);


  const onSubmit = async (data: any) => {
    const dto = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate
        ? new Date(data.dueDate).toISOString()
        : null,
      stateId:
        data.state === "pending"
          ? 1
          : data.state === "in_progress"
          ? 2
          : 3,
    };

    const res = await createTask(dto);
    if (res.statusResponse) navigate("/");
  };

  return (
    <Layout>
      <Paper
        elevation={6}
        sx={{
          maxWidth: 520,
          mx: "auto",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          mb={3}
        >
          Crear tarea
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {JSON.stringify(error)}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            
           
            <TextField
              label="Título"
              placeholder="Escribe un título"
              fullWidth
              required
              {...register("title")}
            />

            
            <TextField
              label="Descripción"
              placeholder="Describe la tarea"
              fullWidth
              multiline
              rows={4}
              {...register("description")}
            />

           
            <TextField
              label="Fecha límite"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("dueDate")}
            />

          
           <TextField
  select
  label="Estado"
  fullWidth
  defaultValue=""
  {...register("stateId")}
>
  {states.map((state) => (
    <MenuItem key={state.Id} value={state.Id}>
      {state.Name}
    </MenuItem>
  ))}
</TextField>


           
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Crear tarea
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default CreateTaskPage;
