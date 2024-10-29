import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './service/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const currentUser = this.dataService.getUser(); // Obtener el usuario actual
    if (currentUser != null) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirigir a login o cualquier otra ruta si no es admin
      return false;
    }
  }
}
