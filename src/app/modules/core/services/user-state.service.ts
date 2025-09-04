import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserHeaderVM {
  fullName: string;
  roleName?: string;
  imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private _userHeader = new BehaviorSubject<UserHeaderVM | null>(null);
  readonly userHeader$ = this._userHeader.asObservable();

  setUserHeader(data: UserHeaderVM) {
    this._userHeader.next(data);
  }
}
