import { useTheme } from "@wits/next-themes";
import Image from "next/image";
import light from "../public/images/icon-sun.svg";
import dark from "../public/images/icon-moon.svg";

const Header = () => {
  const { theme, setTheme } = useTheme("dark");
  if (theme !== "dark" && theme !== "light") setTheme("dark");

  function toggleTheme() {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  }

  return (
    <div
      className={`${theme} flex w-full h-20 justify-between items-center bg-elmts px-3 md:px-10 shadow-xl`}
    >
      <h1 className={`${theme} text-text font-bold`}>Where in the world? </h1>
      <div className={`${theme} text-text flex items-center space-x-3`}>
        <Image
          src={theme === "dark" ? light : dark}
          width={10}
          height={10}
          alt="light/dark"
          className={`${theme} text-text w-3 h-3 md:w-5 md:h-5 hover:cursor-pointer`}
          onClick={toggleTheme}
        />
        <h2>{theme === "dark" ? "Dark " : "Light "} Mode</h2>
      </div>
    </div>
  );
};

export default Header;
