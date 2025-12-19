import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";

const EditStatesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loadStates,
    updateState,
    error,
  } = useTasks();

  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const stateId = Number(id);

    loadStates().then((state: any) => {
      if (state) {
        setValue("name", state.name);
        setValue("rowVersion", state.rowVersion);
      }
      setLoading(false);
    });
  }, [id]);

  const onSubmit = async (data: any) => {
    if (!id) return;

    const payload = {
      name: data.name,
      rowVersion: data.rowVersion,
    };

    const res = await updateState(Number(id), payload);
    if (res.statusResponse) navigate("/");
  };

  if (loading) {
    return (
      <Layout>
        <Stack alignItems="center" mt={6}>
          <CircularProgress />
          <Typography mt={2}>Cargando estado...</Typography>
        </Stack>
      </Layout>
    );
  }

  return (
    <Layout>
      <Paper
        elevation={6}
        sx={{
          maxWidth: 420,
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
          Editar estado
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {JSON.stringify(error)}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>

           
            <input type="hidden" {...register("rowVersion")} />

            <TextField
              label="Nombre del estado"
              fullWidth
              required
              {...register("name")}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Guardar cambios
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default EditStatesPage;
