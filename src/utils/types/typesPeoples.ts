export type TPeoples = {
  id?: string;
  name: string;
  code: string;
  classroom: string[];
  type: string;
}

export type TPeoplesNews = {
  name: string;
  type: string;
  classroom: string[];
  cpf?: string | null;
  email: string;
}
