import { inter, titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className} mt-3`}>
      <h1
        className={`text-4xl ${titleFont.className} antialiased font-semibold my-7`}
      >
        {title}
      </h1>
      {subtitle && <h3 className={`text-xl mb-5`}>{subtitle}</h3>}
    </div>
  );
};
