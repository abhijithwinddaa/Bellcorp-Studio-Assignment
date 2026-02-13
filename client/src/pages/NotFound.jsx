import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page">
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "50vh",
        }}
      >
        <h1
          style={{
            fontSize: "var(--font-size-3xl)",
            fontWeight: 700,
            marginBottom: "var(--spacing-md)",
          }}
        >
          404
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "var(--spacing-xl)",
          }}
        >
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
