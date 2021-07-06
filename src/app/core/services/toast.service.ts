import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _messageService: MessageService) { }

  showSuccess(summary: string, detail: string) {
    this._messageService.add({ severity: 'success', summary: summary, detail: detail});
  }

  showInfo(summary: string, detail: string) {
    this._messageService.add({ severity: 'info', summary: summary, detail: detail });
  }

  showWarn(summary: string, detail: string) {
    this._messageService.add({ severity: 'warn', summary: summary, detail: detail });
  }

  showError(summary: string, detail: string) {
    this._messageService.add({ severity: 'error', summary: summary, detail: detail });
  }

  showTopLeft(message: Message) {
    message.key = 'tl';
    this._messageService.add(message);
  }

  showTopCenter(message: Message) {
    message.key = 'tc';
    this._messageService.add(message);
  }

  showBottomCenter(message: Message) {
    message.key = 'bc';
    this._messageService.add(message);
  }

  showConfirm(summary: string, detail: string) {
    this._messageService.clear();
    this._messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: summary, detail: detail });
  }

  showSticky(message: Message) {
    message.sticky = true;
    this._messageService.add(message);
  }

  showMessage(message: Message) {
    this._messageService.add(message);
  }

  showMultipleMessages(messages: Message[]) {
    this._messageService.addAll(messages);
  }

  onConfirm() {
    this._messageService.clear('c');
  }

  onReject() {
    this._messageService.clear('c');
  }

  clear() {
    this._messageService.clear();
  }

}
