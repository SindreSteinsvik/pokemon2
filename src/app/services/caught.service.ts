import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, finalize, tap } from  'rxjs';



const {apiKey,apiTrainers} = environment

@Injectable({
  providedIn: 'root'
})
export class CaughtService {

  private _loading: boolean = false;

  get loading(): boolean{
    return this._loading;
  }

  constructor(
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
    private readonly http: HttpClient,
  ) {}


   public addToCaught(name: string): Observable<Trainer> {
    if(!this.trainerService.trainer){
      throw new Error("There is no trainer")
    }

    const trainer: Trainer = this.trainerService.trainer;

    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(name)

    if(!pokemon){
      throw new Error("There is no pokemon with name" + name)
    }

    if(this.trainerService.hasCaught(name)){
      alert("You already have the pokemon: " + name)
      throw new Error("You already have the pokemon: " + name)
    }
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    this._loading = true


    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon, pokemon]
    },
    {headers})
    .pipe(
      tap((updatedTrainer: Trainer) =>{
        this.trainerService.trainer = updatedTrainer;

      }),
      finalize(()=>{this._loading=false}))
   }
}
