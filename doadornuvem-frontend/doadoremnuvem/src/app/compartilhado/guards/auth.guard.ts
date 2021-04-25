import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('currentUser')) {
      // logado, então retorna true
      return true;
    }

    // não logado então redireciona para pagina de login com a url de retorno
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
