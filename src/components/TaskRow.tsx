import {
  TableRow,
  TableCell,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const TaskRow = () => (
  <TableRow hover>
    <TableCell>Diseñar UI</TableCell>
    <TableCell>Crear layout principal</TableCell>
    <TableCell>18/12/2025</TableCell>
    <TableCell>
      <Chip label="Pendiente" color="warning" />
    </TableCell>
    <TableCell align="center">
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      <IconButton color="error">
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);
