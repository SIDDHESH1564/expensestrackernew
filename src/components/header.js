import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white z-[1000]">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="hidden mx-auto lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
            Add Expense
          </Link>
          <Link to="/income" className="text-sm font-semibold leading-6 text-gray-900">
            Add Income
          </Link>
          <Link to="/graph" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </Link>
        </div>
      </nav>

    </header>

  );
}
