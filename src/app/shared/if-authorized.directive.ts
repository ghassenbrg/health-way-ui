import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { roles } from '@core/config/roles';

@Directive({
  selector: '[ifAuthorized]'
})
export class IfAuthorizedDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private _auth: AuthenticationService) { }

  @Input() set ifAuthorized(authorizedRoles: String[]) {
    this._auth.decodedTokenSubject.subscribe(decodedTokenValue=> {
      let currentRoles = decodedTokenValue && decodedTokenValue.roles ? decodedTokenValue.roles : []; 
      if (this.checkAccess(authorizedRoles, currentRoles)) {
        // If condition is true add template to DOM
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        // Else remove template from DOM
        this.viewContainer.clear();
      }
    });
  }

  checkAccess(authorizedRoles: String[], currentRoles: string[]): boolean {
    for (const role of authorizedRoles) {
      if (role == roles.ROLE_GUEST) {
        return true;
      }
      for (const currentRole of currentRoles) {
        if (role == currentRole) {
          return true;
        }
      }
    }
    return false;
  }

}
