import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";

const EditStatesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loadStates, updateTask, error } = useTasks();

    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        //const numericId = Number(id);

        loadStates().then((task: any) => {
            if (task) {
                setValue("name", task.name);
            }
            setLoading(false);
        });
    }, [id]);

    const onSubmit = async (data: any) => {
        const numericId = Number(id);

        const payload = {
            name: data.name, 
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
                        <label className="block mb-1 font-medium text-gray-700">Nombre</label>
                        <input
                            {...register("name")}
                            className="w-full p-3 border rounded-xl shadow-sm 
                            focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Título de la tarea"
                        />
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

export default EditStatesPage;
