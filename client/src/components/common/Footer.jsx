import "../../styles/components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>&copy; {new Date().getFullYear()} Bellcorp Events</span>
        <span>Event Management Platform</span>
      </div>
    </footer>
  );
};

export default Footer;
