import Link from "next/link";

const SidebarButton = ({ nombre, icono, href}) => {
  return (
    (<Link
      href={href || "/dashboard"}
      className="hover:bg-blue-400 w-full flex items-center px-5 h-8 touch-auto">

      {/* <img class="w-24 h-24 rounded-full mx-auto" src="images/gdl.jpg" alt="" width="384" height="512"/> */}
      <span className="text-white mr-2 material-icons">{icono}</span>
      <span className="text-white font-serif flex items-center">
        {nombre}
      </span>

    </Link>)
  );
};
export default SidebarButton;
