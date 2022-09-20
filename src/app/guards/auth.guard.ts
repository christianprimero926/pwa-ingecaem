import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { AlertsService } from '../services/Alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertsService
  ) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.role;
    // console.log('expected: ', expectedRole);
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (user) {
          let role = user['rol'];
          if (expectedRole.includes(role)) {
            // console.log(expectedRole.includes(role))
            return true;
          } else {
            this.alertService.showAlert('No autorizado', 'No tienes suficientes permisos...');
            return this.router.parseUrl('');
          }
        } else {
          this.alertService.showAlert('No autorizado', 'No tienes suficientes permisos...');
          return this.router.parseUrl('');
        }
      })
    )
  }

}
