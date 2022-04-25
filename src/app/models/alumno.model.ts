import * as CryptoJS from 'crypto-js';
export class Alumno {
  nombre: string;
  apellido1: string;
  apellido2?: string;
  email: string;
  dni: string;
  tlf: string;
  tlf2?: string;
  pais: string;
  provincia: string;
  codigoPostal: number;
  localidad: string;
  nickName: string;
  password: string;

  constructor(
    nombre: string,
    apellido1: string,
    email: string,
    dni: string,
    tlf: string,
    pais: string,
    provincia: string,
    codigoPostal: number,
    localidad: string,
    nickName: string,
    password: string,
    tlf2?: string,
    apellido2?: string
  ) {
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.codigoPostal = codigoPostal;
    this.dni = dni;
    this.email = email;
    this.localidad = localidad;
    this.nickName = nickName;
    this.nombre = nombre;
    this.pais = pais;
    this.provincia = provincia;
    this.tlf = tlf;
    this.tlf2 = tlf2;
    this.password = this.hash(password);
    console.log(this.password);
  }

  hash(password: string): string{
    return CryptoJS.SHA3(password).toString();
  }
}
