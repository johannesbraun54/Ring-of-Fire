import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from  '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, onSnapshot, addDoc, doc, getDoc, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent,],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  firestore: Firestore = inject(Firestore);
  game: Game = new Game;
  item$;
  item;
  currentGame: any;
  currentGameSnap: any;
  gameId!: string;

 constructor( private route: ActivatedRoute ,public dialog: MatDialog){

  this.route.params.subscribe((params) => {
  let paramsId:string = params['id']
  console.log('var:',paramsId);
  //this.newGame();
  this.gameId = paramsId;
  this.currentGameSnap = this.subGameSnap(paramsId);

  })
  this.item$ = collectionData(this.getDataRef());
  this.item = this.item$.subscribe( (games) => {
  console.log('Games updated', games);

  })
}

getDataRef(){
  return collection(this.firestore, 'games');
}

subGameSnap(paramsId:string){
  onSnapshot (this.getGameRef(paramsId), (game) => {
    this.currentGame = this.setGameObject(game.data());
    this.game = this.currentGame;
    console.log('current Game',this.game)
  })
}

ngonDestroy(){
  this.currentGameSnap(); 
}

setGameObject(obj: any){
  return {
    currentPlayer : obj.currentPlayer,
    playedCards :  obj.playedCards,
    stack: obj.stack,
    players : obj.players,
    pickCardAnimation: obj.pickCardAnimation,
    currentCard: obj.currentCard,
  }
}


getGameRef(paramsId:string){
  return doc(collection(this.firestore, 'games'), paramsId);
}

async newGame(){
  this.game = new Game();
  await addDoc(this.getDataRef(), this.game.toJson());
  //console.log(this.game);
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
    this.game.currentCard = this.game.stack.pop()!;
    //console.log(this.currentCard);
    this.game.pickCardAnimation = true;
    //console.log('New card' , this.currentCard);
    //console.log('Game is' , this.game);
    this.game.currentPlayer++;
    this.game.currentPlayer =  this.game.currentPlayer % this.game.players.length; 
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
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
      this.saveGame();
    }
  });
}



async saveGame(){
  await updateDoc(this.getGameRef(this.gameId),this.setGameObject(this.currentGame) )
}


}


