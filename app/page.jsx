"use client";

import { useTheme } from "@wits/next-themes";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { atom, useAtom } from "jotai";
export const aCountry = atom("");

import Select from "react-select";

import Countries from "../data.json";

const allCountries = Countries.map((elm, index) => ({ ...elm, id: index }));

import Card from "../components/Card";
import Header from "../components/Header";

//----------------------------------
export default function Home() {
  const { theme } = useTheme();

  const [selectInput, setSelectInput] = useState("");
  const [oneCountry, setOneCountry] = useAtom(aCountry);

  const router = useRouter();

  const { register, handleSubmit } = useForm();

  // For the Input Selec bellow
  const countriesNames = allCountries.map((elm) => {
    return { value: elm.name, label: elm.name };
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Array of objects do the Cards
  let arrayToDisplay = [];
  let sorted = [];
  let randomIndex;
  for (let i = 0; i < 8; i++) {
    randomIndex = getRandomInt(0, allCountries.length - 1);
    while (sorted.includes(randomIndex)) {
      randomIndex = getRandomInt(0, allCountries.length - 1);
    }
    sorted.push(randomIndex);
    const newObj = {
      flag: allCountries[randomIndex].flags.png,
      name: allCountries[randomIndex].name,
      population: allCountries[randomIndex].population,
      region: allCountries[randomIndex].region,
      capital: allCountries[randomIndex].capital,
      id: allCountries[randomIndex].id,
    };
    arrayToDisplay.push(newObj);
  }

  // Process the country name from the input
  const filterSubmit = (data) => {
    const enteredName =
      data.country_name.charAt(0).toUpperCase() + data.country_name.slice(1);

    const choosedCountry = allCountries.find(
      (country) => country.name === enteredName
    );

    setOneCountry(choosedCountry);
    router.push("/details");
  };

  function ChangeSelect(selected) {
    const choosedCountry = allCountries.find(
      (country) => country.name === selected.value
    );
    setOneCountry(choosedCountry);
    router.push("/details");
  }

  function clickCountry(id) {
    const clickedCountry = allCountries.find((elm) => elm.id === id);
    setOneCountry(clickedCountry);
    router.push("/details");
  }

  // Messi way to stylize the Select tag
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: `${theme === "dark" ? "#fafafa" : "#111517"}`,
      backgroundColor: state.isSelected
        ? "#858585"
        : `${theme === "dark" ? "#2b3945" : "#fafafa"}`,
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "",
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#000" }),
  };

  return (
    <main
      className={`${theme} flex min-h-screen w-full flex-col items-center justify-between bg-bckg text-text text-sm pb-10`}
    >
      <Header />

      <div className="flex flex-col md:flex-row justify-between py-5 w-full md:w-[95%]">
        {/* Search */}
        <div className="flex-col md:flex-row items-center justify-between rounded-md w-full  px-6">
          <div
            className={`${theme} items-center text-text flex p-4 w-[325px] md:w-96 bg-elmts shadow-lg`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <form onSubmit={handleSubmit(filterSubmit)} className="flex">
              <input
                {...register("country_name")}
                className={`${theme} bg-elmts w-full md:w-80 shadow-lg`}
                type="text"
                placeholder="Search a country..."
              />
            </form>
          </div>
          <form>
            <Select
              className="w-2/3 md:w-60 mt-6 md:mt-0 md:ml-10 bg-elmts shadow-lg"
              onChange={ChangeSelect}
              value={selectInput}
              defaultInputValue=""
              options={countriesNames}
              styles={customStyles}
              autoFocus={true}
            />
          </form>
        </div>
      </div>

      {/* Cards grid */}
      <div
        className={`${theme} bg-bckg grid grid-cols-1 items-center justify-center md:grid-cols-4 gap-y-12 gap-x-16`}
      >
        {arrayToDisplay.map((cntr, index) => (
          <Card key={index} country={cntr} clickCountry={clickCountry} />
        ))}
      </div>
    </main>
  );
}
