import { navitems } from "./constants";

function NavBar() {
  return (
    <nav className="bg-white p-4 lg:block hidden">
      <ul className="space-y-6">
        {navitems.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-text-black-secondary"
          >
            <img src={item.icon} alt={item.name} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 py-6 px-2 flex gap-1.5 bg-neutral-300">
        <p className="p-2 h-fit bg-primary-600 text-white">Go</p>
        <div className="grid font-medium">
          <span>GoPal</span>
          <span className="text-text-black-secondary text-xs">
            Personal Account
          </span>
        </div>
        <img src="/assets/caretupdown.svg" alt="caret up down icon" />
      </div>
    </nav>
  );
}

export default NavBar;
