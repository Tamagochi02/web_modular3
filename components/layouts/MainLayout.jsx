import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ title, user, children }) => {
  return (
    <>
      <div className="flex flex-grow">
        <Sidebar />
        <div className="bg-gray-100 flex flex-col w-full h-screen">
          <Navbar title={title} user={user} />
          <div className="flex-grow px-8 py-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
