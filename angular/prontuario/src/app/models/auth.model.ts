export class AuthUser {
  constructor(
    public nome: string,
    public email: string,
    public expires: number,
    public _token: string
  ) {}

  get token() {
    if (!this.expires || new Date() > new Date(this.expires)) {
      return null;
    }
    return this._token;
  }
}
