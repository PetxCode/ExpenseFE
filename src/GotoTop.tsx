import React, { useEffect } from "react";
import { useLocation } from "react-router";

const GotoTop: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <div>{children}</div>;
};

export default GotoTop;
