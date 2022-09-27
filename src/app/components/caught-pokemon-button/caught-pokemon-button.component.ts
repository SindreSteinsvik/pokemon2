import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CaughtService } from 'src/app/services/caught.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caught-pokemon-button',
  templateUrl: './caught-pokemon-button.component.html',
  styleUrls: ['./caught-pokemon-button.component.css']
})
export class CaughtPokemonButtonComponent implements OnInit {

  public hasCaught: boolean = false;
  

  @Input() pokemonName: string ="";

  get loading(): boolean {
    return this.caughtService.loading;
  }

  constructor(
    private readonly trainerService: TrainerService,
    private readonly caughtService: CaughtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hasCaught = this.trainerService.hasCaught(this.pokemonName);
  }

  onFavoriteClick(): void {
   
    if( this.router.url == "/trainer" ){
      this.trainerService.releasePokemon(this.pokemonName)
    }else{
    this.caughtService.addToCaught(this.pokemonName)
    .subscribe({
      next: (response: Trainer) => {
        alert("Caught a Pokemon: " + this.pokemonName)
        this.hasCaught = this.trainerService.hasCaught(this.pokemonName)
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR" + error.message)
      }
    })
  }
}

}
