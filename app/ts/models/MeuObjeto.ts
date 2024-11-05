import { Imprimivel, Igualavel, Negociacao } from "./index";

export interface MeuObjeto<T> extends Imprimivel, Igualavel<T>{}