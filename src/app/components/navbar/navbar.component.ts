import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer
  }

  constructor(
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
  }

}
