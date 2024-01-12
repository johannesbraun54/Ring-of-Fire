import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, FormsModule, MatDialogModule, MatInputModule, MatInputModule, MatButtonModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {
    //public dialogRef: MatDialogRef<DialogAddPlayerComponent>,

  }

  onNoClick(){
    this.dialogRef.close();
  }

}



