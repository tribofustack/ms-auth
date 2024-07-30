export type authInputDTO = {
  cpf: string;
};

export type authOutputDTO = {
  id: string;
  cpf: string,
};

export type deleteInputDTO = {
  cpf: string;
};

export type deleteOutputDTO = {
  message: string,
};
