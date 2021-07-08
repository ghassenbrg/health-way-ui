import { IfAuthorizedDirective } from "./if-authorized.directive";

describe('HasAccessDirective', () => {
  it('should create an instance', () => {
    const directive = new IfAuthorizedDirective();
    expect(directive).toBeTruthy();
  });
});
