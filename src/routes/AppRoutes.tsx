import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import CreateTaskPage from "../pages/CreateTaskPage";
import EditTaskPage from "../pages/EditTaskPage";
import CreateStatePage from "../pages/CreateStatesPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks/new" element={<CreateTaskPage />} />
            <Route path="/tasks/:id" element={<EditTaskPage />} />
            <Route path="/states/new" element={<CreateStatePage />} />
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
