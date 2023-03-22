import Link from "next/link";

const SidebarButtonD = ({ nombre, icono, href }) => {
  return (
    <Link href={href || "/dashboard_d"}>
      <a className="hover:bg-purple-400 w-full flex items-center px-5 h-8">
        <span className="text-white mr-2 material-icons">{icono}</span>
        <span className="text-white font-serif  flex items-center">
          {nombre}
        </span>
      </a>
    </Link>
  );
};
export default SidebarButtonD;