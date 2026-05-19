import type { FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Section: FC<SectionProps> = ({ children, className = "", id }) => {
  return (
    <section
      id={id}
      className={`py-20 lg:py-32 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

export default Section;
