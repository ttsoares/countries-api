import { useTheme } from "@wits/next-themes";

import Image from "next/image";

//-----------------------------------------
const Card = ({ country, clickCountry }) => {
  const { theme } = useTheme();

  const pop_format = String(country.population).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return (
    <div className="w-full shadow-2xl" onClick={() => clickCountry(country.id)}>
      <div className={`${theme}w-64 h-72 md:w-56 md:h-96 bg-elmts text-text`}>
        <div className="w-fill h-1/2 relative hover:cursor-pointer">
          <Image src={country.flag} alt="flag" fill object-fit="cover" />
        </div>

        <div className="m-5">
          <h1 className="font-bold text-base">{country.name}</h1>
          <h2 className="font-bold">
            Population: <span className="font-normal">{pop_format}</span>
          </h2>
          <h2 className="font-bold">
            Region: <span className="font-normal">{country.region}</span>
          </h2>
          <h2 className="font-bold">
            Capital: <span className="font-normal">{country.capital}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Card;
