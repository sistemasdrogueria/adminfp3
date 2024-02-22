import Menu from "./Menu";
export default function Sidebar() {
  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img 
        src="img/logo.png" 
        alt="Imagen de logo"
         className="w-35" />
      </div>

      <div className="mt-5 border-1">
         <Menu />
      </div>
    </aside>
  );
}
