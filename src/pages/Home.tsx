import { useEffect } from "react";
import Layout from "../components/Layout";
import { useTasks } from "../hooks/useTasks";
import { Link } from "react-router-dom";

const Home = () => {
    const { tasks, loading, error, loadTasks, deleteTaskById,loadStates,deleteStateById,states } = useTasks();

    useEffect(() => {
        loadTasks();
        loadStates();
    }, []);

    const stateColors: any = {
        todo: "bg-gray-100 text-gray-700",
        in_progress: "bg-yellow-100 text-yellow-700",
        done: "bg-green-100 text-green-700",
    };

    return (
 <Layout>
  {loading && (
    <div className="text-center py-6 text-gray-600 animate-pulse text-lg">
      Cargando tareas y estados...
    </div>
  )}

  {error && (
    <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-xl mb-6 font-medium">
      {JSON.stringify(error)}
    </div>
  )}

  {!loading && !error && (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full bg-white rounded-xl">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
              Tareas
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
              Estados
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          
          {Array.from({ length: Math.max(tasks.length, states.length) }).map((_, index) => {
            const task = tasks[index];
            const state = states[index];

            return (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
               
                <td className="px-6 py-5 align-top">
                  {task ? (
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
                        <span
                          className={`
                            mt-1 px-2 py-1 text-xs font-semibold rounded-full w-fit
                            ${stateColors[task.state] || "bg-blue-100 text-blue-600"}
                          `}
                        >
                          {task.state === "todo" && "Por hacer"}
                          {task.state === "in_progress" && "En progreso"}
                          {task.state === "done" && "Completada"}
                        </span>
                        <span
                          className={`
                            mt-1 px-2 py-1 text-xs font-semibold rounded-full w-fit
                            ${stateColors[task.state] || "bg-blue-100 text-blue-600"}
                          `}
                        >
                          {task.description}
                       
                        </span>
                      </div>
                      <div className="flex gap-3 flex-shrink-0">
                        <Link
                          to={`/tasks/${task.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => deleteTaskById(task.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">—</span>
                  )}
                </td>

                <td className="px-6 py-5 align-top">
                  {state ? (
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{state.Name}</h3>
                      </div>
                      <div className="flex gap-3 flex-shrink-0">
                        <Link
                          to={`/states/${state.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Editar
                        </Link>
                        
                        <button
                          onClick={() => deleteStateById(state.Id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      
      {tasks.length === 0 && states.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay tareas ni estados para mostrar.
        </div>
      )}
    </div>
  )}
</Layout>
    );
};

export default Home;
