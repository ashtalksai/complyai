function Error() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", color: "white", marginBottom: "1rem" }}>Error</h1>
        <p style={{ color: "#94A3B8" }}>Something went wrong</p>
      </div>
    </div>
  );
}

Error.getInitialProps = () => ({});

export default Error;
