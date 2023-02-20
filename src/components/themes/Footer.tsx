import { Link } from "react-router-dom";

function Footer() {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <footer className="main-footer">
      <div className="float-right d-none d-sm-block">
        <b>Version</b> 0.1
      </div>
      <strong>
        Copyright &copy; {year} <Link to="#">Admin Lte</Link>.
      </strong>{" "}
      All rights reserved.
    </footer>
  );
}

export default Footer;
