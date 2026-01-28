import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "./AppContext";

const ContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const location = useLocation();

  const value = useMemo(
    () => ({
      backendUrl,
      token,
      location,
      loading,
      setLoading,
      navigate,
      setToken,
    }),
    [backendUrl, token, loading, location, navigate],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
