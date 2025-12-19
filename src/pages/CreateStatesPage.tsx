import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

const CreateStatePage = () => {
  const { createStates, error } = useTasks();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const dto = {
      name: data.name,
    };

    const res = await createStates(dto);
    if (res.statusResponse) navigate("/");
  };

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
          Crear estado
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {JSON.stringify(error)}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            
            
            <TextField
              label="Nombre del estado"
              placeholder="Ej: Pendiente"
              fullWidth
              required
              {...register("name")}
            />

          
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Crear estado
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default CreateStatePage;

