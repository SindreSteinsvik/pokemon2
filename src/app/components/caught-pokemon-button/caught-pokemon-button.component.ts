import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-caught-pokemon-button',
  templateUrl: './caught-pokemon-button.component.html',
  styleUrls: ['./caught-pokemon-button.component.css']
})
export class CaughtPokemonButtonComponent implements OnInit {

  @Input() pokemonName: string ="";

  constructor() { }

  ngOnInit(): void {
  }

  onFavoriteClick(): void {
    alert("Caught a Pokemon: " + this.pokemonName)
  }

}
