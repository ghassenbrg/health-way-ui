import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
/**
 * Singleton Loader Service used to change the state of the loader Subject
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject: Subject<boolean> = new Subject<boolean>();
  loaderState: Observable<boolean> = this.loaderSubject.asObservable();
  private queue: boolean[] = [];

  constructor() {}

  /**
   * Displays the loader
   * @returns {void}
   */
  show() {
    this.queue.push(true);
    this.loaderSubject.next(true);
  }
  /**
   * Hides the loader
   * @returns {void}
   */
  hide() {
    if (this.queue.length > 0) {
      this.queue.splice(0, 1);
    }
    if (this.queue.length == 0) {
      this.loaderSubject.next(false);
    }
  }
}
