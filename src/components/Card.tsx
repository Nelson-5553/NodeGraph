import type { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: FC<CardProps> = ({ children, className = "", hover = true }) => {
  const baseStyles =
    "rounded-2xl border backdrop-blur-sm transition-all duration-300";

  const hoverStyles = hover
    ? "hover:shadow-xl hover:shadow-cyan-400/10 hover:-translate-y-1"
    : "";

  const classes = `${baseStyles} border-gray-300 bg-gray-50 ${hoverStyles} ${className}`;

  return <div className={classes}>{children}</div>;
};

export default Card;
