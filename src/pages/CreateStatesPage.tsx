import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";

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
            <div
                className="
                    max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg
                    border border-gray-200 animate-fade-in
                "
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                    Crear Estado
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4">
                        {JSON.stringify(error)}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Nombre
                        </label>
                        <input
                            {...register("name")}
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

                    <button
                        className="
                            w-full py-3 bg-blue-600 text-white font-semibold
                            rounded-xl shadow-md hover:bg-blue-700
                            transition-all text-lg
                        "
                    >
                        Crear Estado
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default CreateStatePage;
