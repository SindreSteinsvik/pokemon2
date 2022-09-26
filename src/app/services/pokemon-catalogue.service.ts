import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';

const {apiPokemons} = environment


@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  private _pokemon?: Pokemon;

  get pokemons(): Pokemon[] {
    return this._pokemons;
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

  constructor(private readonly http: HttpClient) { }

  

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
        this._pokemons = response.results.map((pokemon) => {
        return {
          ...pokemon
        };
      }),
      this._loading=false;
    },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
        this._loading = false;
      },
    });
  }


  pokemonByName(name: string): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name === name)
  }




}
