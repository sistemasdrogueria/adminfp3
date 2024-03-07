import MenuFarmacia from "./MenuFarmacia";

export default function SidebarFarmacia() {
  return (
     <aside className="md:w-72 h-screen">
      <div className="p-4">
        <img 
        src="/img/logo.png" 
        alt="Imagen de logo"
         className="w-35" />
      </div>

      <div className="mt-5 border-1">
         <MenuFarmacia />
      </div>
    </aside>
  )
}
