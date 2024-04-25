import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserNameValidator {
  async validate(some: any) {
    console.log(some);

    return Math.random() < 0.5;
  }
}
