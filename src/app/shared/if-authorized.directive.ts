import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';

@Directive({
  selector: '[ifAuthorized]'
})
export class IfAuthorizedDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private _auth: AuthenticationService) { }

  @Input() set ifAuthorized(authorizedRoles: String) {
    if (this.checkAccess(authorizedRoles)) {
      // If condition is true add template to DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Else remove template from DOM
      this.viewContainer.clear();
    }

  }

  checkAccess(authorizedRoles: String): boolean {
    let currentRoles: string[] = this._auth.getRoles();
    for (const role of authorizedRoles) {
      if (role == 'ROLE_GUEST') {
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
