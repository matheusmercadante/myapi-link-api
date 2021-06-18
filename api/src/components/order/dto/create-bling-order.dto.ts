export interface BlingParcela {
  data?: Date | string;
  vlr?: number;
  obs?: string;
}

export interface BlingItem {
  codigo?: number | string;
  descricao?: string;
  un?: number | string;
  qtde?: number;
  vlr_unit?: number;
}

export interface BlingVolume {
  servico?: string;
  codigoRastreamento?: string;
}

export interface BlingDadosEtiqueta {
  nome?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  bairro?: string;
}

export interface BlingTransporte {
  transportadora?: string;
  tipo_frete?: string;
  servico_correios?: string;
  dados_etiqueta?: BlingDadosEtiqueta;
  volumes: BlingVolume[];
}

export interface BlingClient {
  nome: string;
  tipoPessoa?: string;
  endereco?: string;
  cpf_cnpj?: string;
  ie?: string;
  numero?: string;
  complement?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  fone?: number;
  email?: string;
}

export class CreateBlingOrderDto {
  cliente: BlingClient;
  transporte?: BlingTransporte;
  items?: BlingItem[];
  parcelas?: BlingParcela[];
  vlr_frete?: number;
  vlr_desconto?: number;
  obs?: string;
  obs_internas?: string;
}
