import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private _trainer?: Trainer;

  public get trainer(): Trainer | undefined {
    return this._trainer
  }

  public set trainer(trainer: Trainer | undefined){
    StorageUtil.LocalStorageSave<Trainer>(StorageKeys.Trainer,trainer!)
    this._trainer = trainer;
  }

  constructor() { 
    this._trainer= StorageUtil.LocalStorageRead<Trainer>(StorageKeys.Trainer)
  }

  public hasCaught(name: string): boolean {
    if(this._trainer){
      return Boolean(this.trainer?.pokemon.find((pokemon: Pokemon) => pokemon.name === name))
    }
    return false
    
  }

  public releasePokemon(name: string): void {
    if(this._trainer){
      this._trainer.pokemon = this._trainer.pokemon.filter((pokemon: Pokemon) => pokemon.name !== name);
    }
  }
}
