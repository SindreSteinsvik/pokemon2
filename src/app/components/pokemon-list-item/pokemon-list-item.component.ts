import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';
const {apiPictures} = environment


@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  
  @Input() pokemon?: Pokemon;
  img:string = ""

  constructor() { }

  getImgLinkByUrl(pokemon:Pokemon): string {
    const id = pokemon.url.split('/')[pokemon.url.split('/').length-2]
    const url = apiPictures + id + ".png"
    return url
  }

  ngOnInit(): void {
  }

}
