import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";

const EditTaskPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loadTask, updateTask, error } = useTasks();

    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const numericId = Number(id);

        loadTask(numericId).then((task: any) => {
            if (task) {
                setValue("title", task.title);
                setValue("description", task.description);
                setValue("dueDate", task.dueDate ? task.dueDate.substring(0, 10) : "");
                setValue("stateId", task.stateId);
                setValue("rowVersion", task.rowVersion); 
            }
            setLoading(false);
        });
    }, [id]);

    const onSubmit = async (data: any) => {
        const numericId = Number(id);

        const payload = {
            title: data.title,
            description: data.description,
            dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
            stateId: Number(data.stateId),
            rowVersion: data.rowVersion 
        };

        const res = await updateTask(numericId, payload);

        if (res.statusResponse) navigate("/");
    };

    if (loading)
        return (
            <Layout>
                <p>Cargando...</p>
            </Layout>
        );

    return (
        <Layout>
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl mx-auto border">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                    Editar Tarea
                </h2>

                {error && (
                    <p className="text-red-600 text-center mb-4">
                        {JSON.stringify(error)}
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    
                    <input type="hidden" {...register("rowVersion")} />

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Título</label>
                        <input
                            {...register("title")}
                            className="w-full p-3 border rounded-xl shadow-sm 
                            focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Título de la tarea"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Descripción</label>
                        <textarea
                            {...register("description")}
                            className="w-full p-3 border rounded-xl shadow-sm 
                            focus:ring-2 focus:ring-blue-400 outline-none"
                            rows={4}
                            placeholder="Descripción detallada..."
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Fecha límite</label>
                        <input
                            type="date"
                            {...register("dueDate")}
                            className="w-full p-3 border rounded-xl shadow-sm 
                            focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Estado</label>
                        <select
                            {...register("stateId")}
                            className="w-full p-3 border rounded-xl shadow-sm 
                            focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value={1}>Pendiente</option>
                            <option value={2}>En progreso</option>
                            <option value={3}>Completada</option>
                        </select>
                    </div>

                    <button
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 
                        text-white font-semibold rounded-xl shadow-md transition"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default EditTaskPage;
