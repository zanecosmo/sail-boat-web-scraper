import express, { Express } from "express";
import axios from "axios";
import cheerio, { CheerioAPI, load } from "cheerio";

// const app: Express = express();

interface Listing {
  title: string,
  length: string,
  year: string,
  price: string,
  location: string,
  broker: string
};

const createUrlPageParameter = (num: number) => `page=${num}`;

const run = async () => {
  const url: string = "https://www.yachtworld.com/boats-for-sale/type-sail/?length=20-50&price=0-15000";

  const response = await axios.get(url);
  
  const html = response.data;

  const $: CheerioAPI = load(html);

  const listings: Array<Listing> = [];

  $(".listing-card-information").each((_i, element) => {
    const title = $(element).find(".listing-card-title").text();
    const [ length, year ] =
      $(element)
        .find(".listing-card-length-year")
        .text()
        .split("/")
        .map(str => str.trim());
    const location = $(element).find(".listing-card-location").text();
    const broker = $(element).find(".listing-card-broker").text();
    const price = $(element).find(".price").find("span").text();

    listings.push({
      title,
      length,
      year,
      price,
      location,
      broker
    });
  });

  console.log(listings);
};

run();


