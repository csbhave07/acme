import { Component, inject, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { IUser } from '../../models/users';
import { SharedService } from '../../services/shared.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-user-details',
  imports: [MatCardModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  private sharedService = inject(SharedService);
  userDetails!: IUser | null;

  constructor() {
    // instead of shared service we can use api data here
    this.sharedService.selectedRow$.pipe(distinctUntilChanged()).subscribe((row: IUser | null) => {
      this.userDetails = row;
    });
  }

}
