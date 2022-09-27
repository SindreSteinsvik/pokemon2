import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';



const {apiPokemons} = environment


@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private readonly _pokemons = new BehaviorSubject<Pokemon[]>([]);
  private _error: string = "";
  private _loading: boolean = false;
  private _pokemon?: Pokemon;

  get pokemons(): Pokemon[] {
    return this._pokemons.getValue();
  }

  get error(): string{
    return this._error;
  }

  get loading(): boolean {
    return this._loading
  }

  get pokemon(): Pokemon {
    return this._pokemon!;
  }

  constructor(private readonly http: HttpClient) {
    const storedPokemons: Pokemon[] | undefined = StorageUtil.SessionStorageRead(StorageKeys.Pokemon)
    if(storedPokemons === undefined) this.findAllPokemons()
    else this._pokemons.next(storedPokemons)
   }

  public findAllPokemons():  void {
      this._loading = true;
      this.http.get<PokemonResponse>(apiPokemons)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (response : PokemonResponse) => {
          this._pokemons.next(response.results)
          StorageUtil.SessionStorageSave(StorageKeys.Pokemon,this.pokemons)
      },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
          this._loading = false;
        },
      });
  }

  pokemonByName(name: string): Pokemon | undefined {
    return this.pokemons.find((pokemon: Pokemon) => pokemon.name === name)
  }
}
