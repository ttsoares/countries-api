"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@wits/next-themes";

import Image from "next/image";

import { useAtom } from "jotai";
import { aCountry } from "../page";

import allCountries from "../../data.json";

import Header from "../../components/Header";

//------------------------------
const Page = () => {
  const [oneCountry, setOneCountry] = useAtom(aCountry);
  const { theme, setTheme } = useTheme();

  const pop_format = String(oneCountry.population).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  let bordersArray;
  if (oneCountry.borders !== undefined) {
    bordersArray = oneCountry.borders.map(
      (border_code) =>
        allCountries.find((country) => country.alpha3Code === border_code).name
    );
  }

  const router = useRouter();
  function back() {
    router.push("/");
  }

  function neighboard(country) {
    const newContry = allCountries.find((elm) => elm.name === country);
    setOneCountry(newContry);
  }

  return (
    <main
      className={`${theme} flex min-h-screen w-full flex-col items-start  bg-bckg text-text text-sm pb-10`}
    >
      <Header />

      {/* Fancy button */}
      <div class="relative inline-flex w-32 group ml-10 mt-5 md:mt-16 mb-5">
        <div
          class={`${theme} absolute transitiona-all duration-1000 opacity-80 -inset-px bg-gradient-to-r from-elmts via-input to-elmts rounded-xl blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt`}
        ></div>
        <button
          class={`${theme} relative inline-flex items-center justify-center px-6 py-2 md:px-10 md:py-3 text-text transition-all duration-200 bg-elmts font-pj rounded-xl focus:outline-none focus:ring-3 focus:ring-offset-4 focus:ring-bckg`}
          onClick={back}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full p-10">
        {/* Flag */}
        <div className="relative w-full md:w-[35%]  h-60 md:h-72 mr-20 shadow-2xl">
          <Image src={oneCountry.flag} alt="flag" fill object-fit="cover" />
        </div>
        {/* Details */}
        <div className="flex flex-col w-full md:w-1/2">
          {/* country data */}
          <div className=" flex flex-col md:flex">
            <div className="flex flex-col">
              <h1 className="mb-4 mt-4 md:-mt-3 text-2xl">{oneCountry.name}</h1>
              <h2>
                Native Name: <span>{oneCountry.nativeName}</span>
              </h2>
              <h2>
                Population: <span>{pop_format}</span>
              </h2>
              <h2>
                Region: <span>{oneCountry.region}</span>
              </h2>
              <h2>
                Sub Region: <span>{oneCountry.subregion}</span>
              </h2>
              <h2>
                Capital: <span>{oneCountry.capital}</span>
              </h2>
            </div>
            <div className="flex flex-col mt-5 ">
              <h2 className="flex w-full">
                Top Level Domain: <span>{oneCountry.topLevelDomain}</span>
              </h2>
              <h2 className="flex">
                Currencies:
                <span className="ml-1 flex space-x-1">
                  {oneCountry.currencies?.map((elm, index) => (
                    <p key={index}>
                      {elm.name}{" "}
                      {`${index < oneCountry.currencies.length - 1 ? "," : ""}`}
                    </p>
                  ))}
                </span>
              </h2>
              <h2 className="flex">
                Languages:{" "}
                <span className="ml-1 flex space-x-1">
                  {oneCountry.languages.map((elm, index) => (
                    <p key={index}>
                      {elm.name}
                      {`${index < oneCountry.languages.length - 1 ? "," : ""}`}
                    </p>
                  ))}
                </span>
              </h2>
            </div>
          </div>
          {/* Borders countries*/}
          <div className="md:mt-5 w-full">
            {bordersArray !== undefined ? (
              <div className="flex flex-col md:flex-row  w-full md:items-center">
                <div className="flex flex-col mb-3">
                  <p
                    className={`${theme} mt-5 md:mt-0 text-text font-bold text-xs w-full md:w-44 mr-3`}
                  >
                    Border Countries:
                  </p>
                  <p className="text-xs text-gray-500">
                    click the country name...
                  </p>
                </div>
                <div className="flex w-full flex-row bg-bckg">
                  <div
                    className={`${theme} grid grid-cols-3 md:grid-cols-4 bg-bckg gap-1 text-xs text-text w-full content-center hover:cursor-pointer`}
                  >
                    {bordersArray.map((elm, index) => (
                      <div
                        className="p-1 bg-elmts text-center shadow-[0px_10px_40px_4px_rgba(0,0,0,0.56)]"
                        key={index}
                        onClick={() => neighboard(elm)}
                      >
                        {elm}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
