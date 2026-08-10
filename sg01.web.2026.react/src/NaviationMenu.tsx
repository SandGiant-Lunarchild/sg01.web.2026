import { Link } from "@tanstack/react-router";

function NavigationMenu() {
  return (
      <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
              Home
          </Link>{' '}
          <Link to="/weather" className="[&.active]:font-bold">
              Weather
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
              About
          </Link>
      </div>
  );
}

export default NavigationMenu;