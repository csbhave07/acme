import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { distinctUntilChanged, Observable } from 'rxjs';
import { IUser, IUsers } from '../models/users';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-users',
  imports: [FormsModule, CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'language', 'bio', 'action'];
  dataSource = new MatTableDataSource<IUser>();
  editRowId: string | null = null;


  private userService = inject(UsersService);
  private router = inject(Router);
  private sharedService = inject(SharedService);
  
  ngAfterViewInit() {
    this.userService.getUserData().pipe(distinctUntilChanged()).subscribe((users: IUsers) => {
      this.dataSource.data = users
      this.dataSource.paginator = this.paginator;
    });
  }


  onRowClick(row: IUser, event: MouseEvent): void {
    if (!this.editRowId) {
      this.sharedService.setSelectedRow(row);
      this.router.navigateByUrl(row.id);
    }
  }

  enableEdit(row: any, event: MouseEvent) {
    event.stopPropagation(); // Prevent row click
    row.editing = true;
    this.editRowId = row.id;
  }

  saveEdit(row: IUser, event: MouseEvent) {
    event.stopPropagation(); // Prevent row click
    row.editing = false;
    this.editRowId = null;
  }

  cancelEdit(row: IUser, event: MouseEvent) {
    event.stopPropagation(); // Prevent row click
    row.editing = false;
    this.editRowId = null;
  }
}
