"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@wits/next-themes";

import Image from "next/image";

import { useAtom } from "jotai";
import { aCountry } from "../page";

import data from "../../data.json";

import Header from "../../components/Header";

//------------------------------
const Page = () => {
  const [oneCountry] = useAtom(aCountry);
  const { theme, setTheme } = useTheme();

  const pop_format = String(oneCountry.population).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  let bordersArray;
  if (oneCountry.borders !== undefined) {
    bordersArray = oneCountry.borders.map(
      (border_code) =>
        data.find((country) => country.alpha3Code === border_code).name
    );
  }

  const router = useRouter();

  function back() {
    router.push("/");
  }

  function toggleTheme() {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  }

  return (
    <main
      className={`${theme} flex min-h-screen w-full flex-col items-start  bg-bckg text-text text-sm pb-10`}
    >
      <Header />

      {/* Fancy button */}
      <div class="relative inline-flex w-32 group ml-10 mt-16 mb-5">
        <div
          class={`${theme} absolute transitiona-all duration-1000 opacity-80 -inset-px bg-gradient-to-r from-elmts via-input to-elmts rounded-xl blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt`}
        ></div>
        <button
          class={`${theme} relative inline-flex items-center justify-center px-10 py-3 text-text transition-all duration-200 bg-elmts font-pj rounded-xl focus:outline-none focus:ring-3 focus:ring-offset-4 focus:ring-bckg`}
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

      <div className="flex w-full p-10">
        {/* Flag */}
        <div className="relative w-[35%]  h-72 mr-20">
          <Image src={oneCountry.flag} alt="flag" fill object-fit="cover" />
        </div>
        {/* Details */}
        <div className="flex flex-col w-1/2">
          {/* country data */}
          <div className="flex">
            <div className="flex flex-col">
              <h1 className="mb-4 mt-4 text-2xl">{oneCountry.name}</h1>
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
            <div className="flex flex-col mt-16 ml-12">
              <h2>
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
          {/* Borders */}
          <div className="mt-10 w-full">
            {bordersArray !== undefined ? (
              <div className="flex flex-row w-full items-center">
                <p className={`${theme} text-text font-bold text-xs w-44 mr-3`}>
                  Border Countries:
                </p>
                <div className="flex w-full flex-row">
                  <div
                    className={`${theme} bg-elmts text-xs flex flex-wrap text-text space-y-1 items-center w-full`}
                  >
                    {bordersArray.map((elm, index) => (
                      <>
                        <div className="px-4 mx-2 flex" key={index}>
                          {elm}
                        </div>
                        <p className="bg-bckg">&nbsp;&nbsp;</p>
                      </>
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
