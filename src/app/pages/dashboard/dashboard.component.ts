import { AfterViewInit, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgClass, SlicePipe } from '@angular/common';
import { DashboardService, PeriodicElement } from '../../shared/services/dashboard.service';
import { Subscription } from 'rxjs';
import { CardComponent } from "../../shared/components/card.component";
import { environment } from '../../../environments/environment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../../shared/components/confirm.component';
import { EditMemberComponent } from '../../shared/components/edit-member.component';
import { AddMemberComponent } from '../../shared/components/add-member.component';
import { PieChartComponent } from "../../shared/components/charts/pie-chart.component";
import { StackedChartComponent } from "../../shared/components/charts/stacked-chart.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    SlicePipe,
    CardComponent,
    PieChartComponent,
    StackedChartComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['name', 'status', 'role', 'email', 'teams', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  badgeClasses = ['badge-primary', 'badge-secondary', 'badge-tertiary'];

  dashboardSub!: Subscription

  name!: string;
  revenueData!: { total: string; trend: string; direction: string };
  usersData!: { total: string; trend: string; direction: string };
  conversionData!: { total: string; trend: string; direction: string };
  signupsData!: { total: string; trend: string; direction: string };

  dashboardService = inject(DashboardService)
  dialog = inject(MatDialog)

  ngOnInit() {
    this.dashboardService.getTeamMembers()
    this.dashboardSub = this.dashboardService.teamMemberInfo.subscribe({
      next: (data) => {
        this.dataSource.data = data ?? []
      }
    })
    this.dashboardSub = this.dashboardService.userName.subscribe({
      next: (name) => {
        this.name = name
      }
    })
    this.dashboardSub = this.dashboardService.revenueInfo.subscribe({
      next: (data) => {
        this.revenueData = data
      }
    })
    this.dashboardSub = this.dashboardService.usersInfo.subscribe({
      next: (data) => {
        this.usersData = data
      }
    })
    this.dashboardSub = this.dashboardService.conversionInfo.subscribe({
      next: (data) => {
        this.conversionData = data
      }
    })
    this.dashboardSub = this.dashboardService.signupInfo.subscribe({
      next: (data) => {
        this.signupsData = data
      }
    })
  }

  openAddMemberModal() {
    const dialogRef = this.dialog.open(AddMemberComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== null) {
        this.dashboardService.addMember(result)
      }
    });
  }

  deleteMember(name: string, index: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {name: name, index: index},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined && result === 'ok') {
        this.dashboardService.filterMember(index)
      }
    });
  }

  editMember(data: PeriodicElement, index: number) {
    const dialogRef = this.dialog.open(EditMemberComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== null) {
        this.dashboardService.updateMember(result, index)
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if(this.dashboardSub) this.dashboardSub.unsubscribe()
  }
}
