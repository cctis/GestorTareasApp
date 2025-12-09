import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center px-4 py-6">
      
      <div className="w-full max-w-4xl mt-6 mb-12 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        <header className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Gestión de Tareas
          </h1>

          <Link
            to="/tasks/new"
            className="
              px-5 py-2.5 rounded-xl 
              bg-gradient-to-r from-blue-600 to-indigo-600 
              text-white font-semibold shadow-lg 
              hover:shadow-xl hover:from-blue-700 hover:to-indigo-700
              active:scale-95 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
            "
          >
            + Nueva Tarea
          </Link>
          <br></br>

              <Link
            to="/states/new"
            className="
              px-5 py-2.5 rounded-xl 
              bg-gradient-to-r from-blue-600 to-indigo-600 
              text-white font-semibold shadow-lg 
              hover:shadow-xl hover:from-blue-700 hover:to-indigo-700
              active:scale-95 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
            "
          >
            + Nuevo Estado
          </Link>
        </header>

        
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
