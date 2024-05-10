export interface Company {
  id: number;
  name: string;
  role: string;
  url: string;
}

export enum EnumCompany {
  MERITUM = "meritum",
  META = "meta",
  OLIST = "olist",
  GAZETA_DO_POVO = "gazeta do povo",
}
