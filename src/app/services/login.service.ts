import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';
import { map, Observable, of, switchMap, tap } from  'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';

const {apiTrainers,apiKey} = environment;


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //dependency injection
  constructor(private readonly http: HttpClient) { }

  //login handling
  public login(username:string): Observable<Trainer>{  //function login, input username, output Obervable of type Trainer
    return this.checkTrainerName(username)
    .pipe(
      switchMap((trainer: Trainer | undefined)=>{
        if (trainer === undefined){ //trainer does not exist
          return this.createTrainer(username) 
        }
        return of(trainer);
      }),
      tap((trainer: Trainer) => {
        StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer)
      })
    )
  }

  //check if user exist
  private checkTrainerName(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(
        map((response: Trainer[]) => response.pop())
      )
  }


  //Create user if none exist
  private createTrainer(username: string): Observable<Trainer>{
    //trainer
    const trainer = {
      username,
      pokemon: []
    };
    //header
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });
    
    //post
    return this.http.post<Trainer>(apiTrainers,trainer, {
      headers
    })
  }


  //if yes exist: store user to localstorage
}
