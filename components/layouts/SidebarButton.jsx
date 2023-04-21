import Link from "next/link";

const SidebarButton = ({ nombre, icono, href }) => {
  return (
    (<Link
      href={href || "/dashboard"}
      className="text-gray-700 px-4 py-2 rounded-md flex items-center touch-auto
      hover:bg-gray-200">
      <span className="mr-2 material-icons">{icono}</span>
      <span className="flex items-center">
        {nombre}
      </span>

    </Link>)
  );
};
export default SidebarButton;
