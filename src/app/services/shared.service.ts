import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedRowSource = new BehaviorSubject<IUser | null>(null);
  selectedRow$ = this.selectedRowSource.asObservable();

  setSelectedRow(row: IUser) {
    this.selectedRowSource.next(row);
  }

  clearSelectedRow() {
    this.selectedRowSource.next(null);
  }

}
