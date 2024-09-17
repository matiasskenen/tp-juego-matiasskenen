import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSource = new BehaviorSubject<any>(null); // Inicializamos con null
  currentUser = this.userSource.asObservable();

  constructor() {}

  setUser(user: any) {
    this.userSource.next(user); // Actualizamos el usuario
  }
}
