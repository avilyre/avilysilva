import { companies } from "@/@data/companies";
import { Companies, Company } from "@/@types/company";

export const getCompany = (name: Companies) => {
  return companies.find(company => company.name === name) as Company;
};
