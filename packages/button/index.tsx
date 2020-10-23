import React, { useState, FC, useEffect } from "react";

import Icon from "../icon";

import { classes } from "../utils";
import "./style/index.less";

const componentName = "Button";

interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  type?: "default" | "dashed" | "primary" | "danger";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  icon?: string;
  position?: "left" | "right";
  size?: "small" | "medium" | "large";
}

const Button: FC<ButtonProps> = ({
  loading,
  onClick,
  type = "default",
  disabled = false,
  children,
  className,
  icon,
  size,
}) => {
  const [innerLoading, setLoading] = useState<boolean>(!!loading);

  const buttonClassName = classes(componentName, "", [type, className], {
    disabled,
    loading,
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

  const renderIcon = () => {
    const className = classes(componentName, "icon", [size], { loading });

    return loading ? (
      <Icon name="loading" className={className} />
    ) : (
      icon && <Icon name={icon} className={className} />
    );
  };

  return (
    <button
      className={buttonClassName}
      onClick={handleClick}
      disabled={disabled}
    >
      {renderIcon()}
      {children}
    </button>
  );
};

Button.displayName = componentName;

export default Button;
