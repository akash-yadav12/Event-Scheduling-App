import { useState, useEffect } from "react";

import { v4 } from "uuid";

export const useToastMessage = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${v4()}`);

  useEffect(() => {
    const el = document.createElement("div");
    el.id = portalId;
    el.style = "position: fixed; top: 5.5rem; right: 10px;z-index:100";
    document.body.prepend(el);

    setLoaded(true);

    return () => document.body.removeChild(el);
  }, [portalId]);

  return { loaded, portalId };
};
