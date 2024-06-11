import { Company } from "@/@types/company";

export interface CareerCardProps {
  role: string;
  startDate: string;
  endDate?: string;
  company: Company;
  outsourced?: Company;
}
