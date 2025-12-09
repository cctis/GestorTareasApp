import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";

const CreateTaskPage = () => {
    const { createTask, error } = useTasks();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {

        
        const dto = {
            title: data.title,
            description: data.description,
            dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
            stateId:
                data.state === "pending"
                    ? 1
                    : data.state === "in_progress"
                    ? 2
                    : 3
        };

        const res = await createTask(dto);
        if (res.statusResponse) navigate("/");
    };

    return (
        <Layout>
            <div
                className="
                    max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg
                    border border-gray-200 animate-fade-in
                "
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                    Crear Tarea
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4">
                        {JSON.stringify(error)}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Título
                        </label>
                        <input
                            {...register("title")}
                            className="
                                w-full p-3 border rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                transition-all
                                text-gray-800
                            "
                            placeholder="Escribe un título..."
                            required
                        />
                    </div>

                  
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Descripción
                        </label>
                        <textarea
                            {...register("description")}
                            className="
                                w-full p-3 border rounded-xl h-28 resize-none
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                transition-all
                                text-gray-800
                            "
                            placeholder="Describe la tarea..."
                        ></textarea>
                    </div>

                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Fecha límite (opcional)
                        </label>
                        <input
                            type="date"
                            {...register("dueDate")}
                            className="
                                w-full p-3 border rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                transition-all
                                text-gray-800
                            "
                        />
                    </div>

                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Estado
                        </label>
                        <select
                            {...register("state")}
                            className="
                                w-full p-3 border rounded-xl bg-white
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                transition-all
                                text-gray-800
                            "
                        >
                            <option value="pending">Pendiente</option>
                            <option value="in_progress">En progreso</option>
                            <option value="done">Completada</option>
                        </select>
                    </div>

                 
                    <button
                        className="
                            w-full py-3 bg-blue-600 text-white font-semibold
                            rounded-xl shadow-md hover:bg-blue-700
                            transition-all text-lg
                        "
                    >
                        Crear tarea
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default CreateTaskPage;
