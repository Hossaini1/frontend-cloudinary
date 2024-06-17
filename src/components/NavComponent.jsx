import ThemeToggler from "./ThemeToggler";

const NavComponent = () => {
  return (
    <div className="navbar bg-base-100 py-3 lg:px-20 ">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">REACT-Dinary</a>
      </div>
      <div className="navbar-end">
        <ThemeToggler />
      </div>
    </div>
  );
};
export default NavComponent;
