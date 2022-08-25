import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import "./Footer.css";

const Footer = (props) => {
  return (
    <>
      <footer
        className="row row-cols-5  my-5 py-3 px-3  border-top"
        id="footer"
      >
        <div className="col">
          <p className="footer-title">Quick Links</p>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                Features
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                Pricing
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                FAQs
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                About
              </a>
            </li>
          </ul>
        </div>

        <div className="col">
          <p className="footer-title">Company</p>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                <NavLink to="/termsOfuse">Terms Of Use</NavLink>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                <NavLink to="/privacyPolicy">Privacy Policy</NavLink>
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                <NavLink to="/riskDisclosurer">Risk Disclosurer</NavLink>
              </a>
            </li>
          </ul>
        </div>
        {/* --------------------------------------------------------------------------------------------Social Icons */}
        <div className="col">
          <p className="footer-title">Social</p>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                <FacebookIcon />
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                <LinkedInIcon />
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/" className="nav-link p-0 text-muted">
                <EmailIcon />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
