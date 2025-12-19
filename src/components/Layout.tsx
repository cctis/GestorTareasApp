import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Stack,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  search?: string;
  onSearchChange?: (value: string) => void;
  withTable?: boolean;
  
}


const Layout = ({
  children,
  search = "",
  onSearchChange,
   withTable = false,
}: LayoutProps) => {
  return (
    <>
     
      <AppBar position="static" color="primary" elevation={4}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gestión de Tareas
          </Typography>
        </Toolbar>
      </AppBar>

     
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          
         
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
           
            <TextField
              label="Buscar tarea"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />

            
            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                to="/tasks/new"
                variant="contained"
              >
                + Crear Tarea
              </Button>

              <Button
                component={Link}
                to="/states/new"
                variant="outlined"
              >
                + Crear Estado
              </Button>
            </Stack>
          </Stack>

         
          {withTable ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Título</b></TableCell>
                
                <TableCell><b>Fecha creación</b></TableCell>
                <TableCell><b>Estado</b></TableCell>
                <TableCell align="center"><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {children}
            </TableBody>
          </Table>

            ) : (
            <>{children}</>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Layout;
