import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  get trainer(): Trainer | undefined{
    return this.trainerService.trainer;
  }

  get favourites(): Pokemon[] {
    if(this.trainerService.trainer){
      return this.trainerService.trainer.pokemon 
    }
    return [];
  }
  constructor(
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
  }

}
