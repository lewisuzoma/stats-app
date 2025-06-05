import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions
  ],
  template: `
    <div class="p-4">
      <h2 mat-dialog-title>Delete Member</h2>
      <mat-dialog-content>
        Would you like to delete <strong>{{data.name}}</strong>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button class="text-sm px-4 py-2 me-4 bg-danger border-0 rounded hover:bg-gray-300"
          (click)="action('no')">No</button>
        <button class="text-sm px-4 py-2 bg-success border-0  rounded hover:bg-gray-300" (click)="action('ok')">Yes</button>
      </mat-dialog-actions>
    </div>

  `,
  styles: ``
})
export class ConfirmComponent {
    
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  action(data: string): void {
    this.dialogRef.close(data); // Pass the result back to the opening component
  }

}
