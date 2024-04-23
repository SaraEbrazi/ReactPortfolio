import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div
      style={{
        
        color: "var(--slate-300)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
     <p>Loading Data...</p>
      <LoaderIcon style={{ width: "2.3rem", height: "2.3rem" }} />
    </div>
  );
}

export default Loader;