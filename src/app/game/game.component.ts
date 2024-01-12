import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from  '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game;
  currentCard: string  = '';

constructor(public dialog: MatDialog){
  this.game = new Game();
  this.newGame();
}


newGame(){
  console.log(this.game);
}

/*takeCard(){
  this.currentCard = this.game.stack.pop();
  console.log(this.currentCard);
  this.pickCardAnimation = true;
  this.game.playedCards.push(this.currentCard);
  setTimeout(() => {
    this.pickCardAnimation = false;
  },1500)

}*/
  
takeCard() {
  if (this.game.stack.length > 0) {
    this.currentCard = this.game.stack.pop()!;
    //console.log(this.currentCard);
    this.pickCardAnimation = true;
    //console.log('New card' , this.currentCard);
    //console.log('Game is' , this.game);
    this.game.currentPlayer++;
    this.game.currentPlayer =  this.game.currentPlayer % this.game.players.length; 

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  } else {
    console.error("Das Stack-Array ist leer.");
  }
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  dialogRef.afterClosed().subscribe((name: string ) => {
    if (name && name.length > 1){
      console.log('The dialog was closed', name);
      this.game.players.push(name);
    }
  });
}


}


