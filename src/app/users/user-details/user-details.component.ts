import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IUser } from '../../models/users';
import { SharedService } from '../../services/shared.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-details',
  imports: [MatCardModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  private sharedService = inject(SharedService);
  userDetails!: IUser | null;
  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    // instead of shared service we can use api data here
    this.sharedService.selectedRow$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((row: IUser | null) => {
      this.userDetails = row;
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
