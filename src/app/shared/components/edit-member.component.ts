import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  template: `
    <div class="p-4">
      <h2 mat-dialog-title>Update Member</h2>
      <mat-dialog-content>
        <form [formGroup]="form">
          <div class="mb-3">
            <label>Name</label>
            <input type="text" formControlName="name" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <div class="p-1">
              <span *ngIf="f.name?.invalid && (f.name?.dirty || f.name?.touched)">
                <span *ngIf="f.name?.errors?.['required']" class="text-danger fs-12">Name is required</span>
              </span>
            </div>
          </div>
          <div class="mb-3">
            <label>Status</label>
            <select formControlName="status" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required >
              <option value="">--SELECT--</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div class="p-1">
              <span *ngIf="f.status?.invalid && (f.status?.dirty || f.status?.touched)">
                <span *ngIf="f.status?.errors?.['required']" class="text-danger fs-12">Status is required</span>
              </span>
            </div>
          </div>
          <div class="mb-3">
            <label>Role</label>
            <input formControlName="role" type="text" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <div class="p-1">
              <span *ngIf="f.role?.invalid && (f.role?.dirty || f.role?.touched)">
                <span *ngIf="f.role?.errors?.['required']" class="text-danger fs-12">Role is required</span>
              </span>
            </div>
          </div>
          <div class="mb-3">
            <label>Teams</label>
            <textarea formControlName="teams" type="text" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required ></textarea>
            <div class="p-1">
              <span *ngIf="f.teams?.invalid && (f.teams?.dirty || f.teams?.touched)">
                <span *ngIf="f.teams?.errors?.['required']" class="text-danger fs-12">Teams is required</span>
              </span>
            </div>
          </div>
        </form>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button class="text-sm px-4 py-2 me-4 bg-gray-200 border-0 rounded hover:bg-gray-300"
          (click)="close()">Close</button>
        <button class="text-sm px-4 py-2 bg-blue-600 border-0  rounded hover:bg-gray-300" (click)="updateMember()">Update</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: ``
})
export class EditMemberComponent {

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    teams: new FormControl(null, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form.patchValue({
        name: data.name,
        status: data.status,
        role: data.role,
        email: data.email,
        teams: data.teams
      })
    }

  get f() { 
    return this.form.controls; 
  }

  close(): void {
    this.dialogRef.close(null); // Pass the result back to the opening component
  }
  updateMember(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all controls as touched to show validation errors
      return;
    }
    const formValue = this.form.value;
    const payload = {
      ...formValue,
      teams: Array.isArray(formValue.teams)
        ? formValue.teams
        : (formValue.teams ?? '').split(',').map(team => team.trim())
    };
    this.dialogRef.close(payload); // Pass the result back to the opening component
  }
}
