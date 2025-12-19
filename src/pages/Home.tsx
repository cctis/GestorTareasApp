
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";

import {
  TableRow,
  TableCell,
  Typography,
  IconButton

} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const {
    tasks,
   
    loading,
    error,
    loadTasks,
    loadStates,
    deleteTaskById,
  } = useTasks();

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTasks();
    loadStates();
  }, []);

  if (loading) {
    return (
      <Layout>
        <TableRow>
          <TableCell colSpan={5} align="center">
            <Typography>Cargando tareas...</Typography>
          </TableCell>
        </TableRow>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <TableRow>
          <TableCell colSpan={5} align="center">
            <Typography color="error">
              {JSON.stringify(error)}
            </Typography>
          </TableCell>
        </TableRow>
      </Layout>
    );
  }

  if (tasks.length === 0) {
    return (
      <Layout>
        <TableRow>
          <TableCell colSpan={5} align="center">
            <Typography color="text.secondary">
              No hay tareas para mostrar
            </Typography>
          </TableCell>
        </TableRow>
      </Layout>
    );
  }

 

const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase()) ||
  task.description?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <Layout 
    withTable
    search={search}
  onSearchChange={setSearch}>
      {filteredTasks.map((task) => (
        
        
        <TableRow key={task.id} hover>

         
          <TableCell>
            <Typography fontWeight={600}>
              {task.title}
            </Typography>
          </TableCell>

         
          

          
          <TableCell>
            {task.DueDate
              ? new Date(task.DueDate).toLocaleDateString()
              : "—"}
          </TableCell>

          
          <TableCell>
        <Typography >
              {task.state}
            </Typography>
        </TableCell>


        
          <TableCell align="center">
            <IconButton
              component={Link}
              to={`/tasks/${task.id}`}
              color="primary"
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              onClick={() => deleteTaskById(task.id)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>

        </TableRow>
         ))}
      
    </Layout>
  );
};

export default Home;


