export class Login {
  login: string;
  clave: string;

  constructor(login: string = '', clave: string = '') {
    this.login = login;
    this.clave = clave;
  }
}
