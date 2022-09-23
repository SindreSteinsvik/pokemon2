import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokeman-catalogue',
  templateUrl: './pokeman-catalogue.page.html',
  styleUrls: ['./pokeman-catalogue.page.css']
})
export class PokemanCataloguePage implements OnInit {

  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string{
    return this.pokemonCatalogueService.error;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemons();
  }

}
