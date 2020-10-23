import React, { useState, FC, useEffect } from "react";
import { classes } from "../utils";

const componentName = "Button";

interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  type?: "default" | "dashed" | "primary" | "danger";
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button: FC<ButtonProps> = ({
  loading,
  onClick,
  type = "default",
  disabled = false,
}) => {
  const [innerLoading, setLoading] = useState<boolean>(!!loading);

  const buttonClassName = classes(componentName, [type], {
    disabled,
  });

  useEffect(() => {
    setLoading(!!loading);
  }, [loading]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    if (innerLoading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };

  return (
    <button className={buttonClassName} onClick={handleClick}>
      button
    </button>
  );
};

Button.displayName = componentName;

export default Button;
