export class Alumno {
  private static contadorAlumnos: number = 0;
  private _id: number;
  private _activo: boolean;

  private _nombre: string;
  private _apellido1: string;
  private _apellido2?: string;
  private _email: string;
  private _dni: string;
  private _tlf: string;
  private _tlf2?: string;
  private _pais: Paises;
  private _provincia: Provincias | string;
  private _codigoPostal: number;
  private _localidad: string;
  private _nickName: string;
  private _password: string;

  constructor(
    nombre: string,
    apellido1: string,
    email: string,
    dni: string,
    tlf: string,
    pais: Paises,
    provincia: Provincias | string,
    codigoPostal: number,
    localidad: string,
    nickName: string,
    password: string,
    tlf2?: string,
    apellido2?: string
  ) {
    Alumno.contadorAlumnos++;
    this._id = Alumno.contadorAlumnos;
    this._activo = true;

    this._apellido1 = apellido1;
    this._apellido2 = apellido2;
    this._codigoPostal = codigoPostal;
    this._dni = dni;
    this._email = email;
    this._localidad = localidad;
    this._nickName = nickName;
    this._nombre = nombre;
    this._pais = pais;
    this._provincia = provincia;
    this._tlf = tlf;
    this._tlf2 = tlf2;
    this._password = this.hash(password);
  }

  private hash(password: string): string {
    return password;
  }

  eliminar(): void
  {
    this._activo = false;
  }

  get id():number
  {
    return this._id;
  }
}
