import { Injectable } from '@angular/core';
import { Memoize } from 'fast-typescript-memoize';

@Injectable({ providedIn: 'root' })
export class UserNameValidator {
  // invalidates cache if
  // - parameter "candidate" changes
  // - promise rejects
  @Memoize()
  async canUserNameBeTaken(candidate: string): Promise<boolean> {
    console.log('Check user name availability for', candidate);

    return Math.random() < 0.5;
  }
}
