import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CaughtService } from 'src/app/services/caught.service';

@Component({
  selector: 'app-caught-pokemon-button',
  templateUrl: './caught-pokemon-button.component.html',
  styleUrls: ['./caught-pokemon-button.component.css']
})
export class CaughtPokemonButtonComponent implements OnInit {

  @Input() pokemonName: string ="";

  get loading(): boolean {
    return this.caughtService.loading;
  }

  constructor(
    private readonly caughtService: CaughtService
  ) { }

  ngOnInit(): void {
  }

  onFavoriteClick(): void {
   
    this.caughtService.addToCaught(this.pokemonName)
    .subscribe({
      next: (response: Trainer) => {
        console.log("NEXT" + response)
        alert("Caught a Pokemon: " + this.pokemonName)
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR" + error.message)
        alert("ERROR" + error.message)
      }
    })
  }

}
