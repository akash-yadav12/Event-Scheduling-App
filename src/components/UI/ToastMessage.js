import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";
import { v4 } from "uuid";

import { useToastMessage } from "../../hooks/useToastMessage";
import classes from "./ToastMessage.module.css";

// eslint-disable-next-line react/display-name
const ToastMessage = forwardRef((props, ref) => {
  const { loaded, portalId } = useToastMessage();
  const [toasts, setToasts] = useState([]);
  const [removing, setRemoving] = useState("");

  useEffect(() => {
    if (removing) {
      setToasts((t) => t.filter((_t) => _t.id !== removing));
    }
  }, [removing, setToasts]);

  useEffect(() => {
    if (toasts.length) {
      const id = toasts[toasts.length - 1].id;
      setTimeout(() => setRemoving(id), 2000);
    }
  }, [toasts]);

  useImperativeHandle(ref, () => ({
    addToastMessage(toast) {
      setToasts([...toasts, { ...toast, id: v4() }]);
    },
  }));
  return loaded
    ? ReactDOM.createPortal(
        <div className={classes.toastWrap}>
          {toasts.map((t) => (
            <div key={t.id} className={`${classes.toast} ${classes[t.type]}`}>
              <div className={classes.message}>{t.message}</div>
            </div>
          ))}
        </div>,
        document.getElementById(portalId)
      )
    : null;
});

export default ToastMessage;

ToastMessage.propTypes = {
  message: PropTypes.string,
};
