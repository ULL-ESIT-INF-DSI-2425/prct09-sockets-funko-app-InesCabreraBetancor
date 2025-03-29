/**
 * Enum del tipo de Funk que podemos tener
 */
export enum TipoFunko {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VinylSoda = "Vinyl Soda",
  VinylGold = "Vinyl Gold"
}

/**
 * Enum del genero de entretenimiento del funko pop
 */
export enum GeneroFunko {
  Animacion = "Animación",
  PeliculasTV = "Películas y TV",
  Videojuegos = "Videojuegos",
  Deportes = "Deportes",
  Musica = "Música",
  Anime = "Ánime"
}

/**
 * Class Funko
 */
export class Funko {
  constructor(
      private _id: string,
      private _nombre: string,
      private _descripcion: string,
      private _tipo: TipoFunko,
      private _genero: GeneroFunko,
      private _franquicia: string,
      private _numero: number,
      private _exclusivo: boolean,
      private _caracteristicas: string,
      private _valor: number
  ) {}
  /**
   * Getter del id del funko
   */
  get id() : string {
    return this._id;
  }
  /**
   * Getter del nombre del funko
   */
  get nombre() : string {
    return this._nombre;
  }
  /**
   * Getter de la desciprcion del funko
   */
  get descripcion() : string {
    return this._descripcion;
  }
  /**
   * Getter del tipo del funko
   */
  get tipo() : TipoFunko {
    return this._tipo;
  }
  /**
   * Getter del genero del funko
   */
  get genero() : GeneroFunko {
    return this._genero;
  }
  /**
   * Getter de la franquicia donde se compró el funko
   */
  get franquicia() : string {
    return this._franquicia;
  }
  /**
   * getter del numero identificativo del funko
   */
  get numero() : number {
    return this._numero
  }
  /**
   * Getter de si es exclusivo o no el funko
   */
  get exclusivo() : boolean {
    return this._exclusivo;
  }
  /**
   * Getter de las caracteristicas del funko
   */
  get caracteristicas() : string {
    return this._caracteristicas;
  }
  /**
   * Getter del valor en euros del funko pop
   */
  get valor() : number {
    return this._valor;
  }
}