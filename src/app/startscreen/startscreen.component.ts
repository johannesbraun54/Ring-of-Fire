import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  firestore: Firestore = inject(Firestore);
  game: Game = new Game;

  constructor(private router: Router){

  }

  async newGame(){
    //start game
    let game = new Game();
    await addDoc(this.getDataRef(), this.game.toJson())
    .then((gameinfo) => {
      this.router.navigateByUrl('/game/' + gameinfo.id);
    })

  }


  getDataRef(){
    return collection(this.firestore, 'games');
  }


}
