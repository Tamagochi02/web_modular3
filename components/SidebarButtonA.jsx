import Link from "next/link";

const SidebarButtonA = ({ nombre, icono, href }) => {
  return (
    (<Link
      href={href || "/dashboard_a"}
      className="hover:bg-green-800 w-full flex items-center px-5 h-8">

      <span className="text-white mr-2 material-icons">{icono}</span>
      <span className="text-white font-serif  flex items-center">
        {nombre}
      </span>

    </Link >)
  );
};
export default SidebarButtonA;

