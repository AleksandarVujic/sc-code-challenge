import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Message } from '../../models/message';
import { MESSAGE_TIMEOUT } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagesSource = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSource.asObservable();

  add(message: Message): void {
    const currentMessages = this.messagesSource.getValue();
    this.messagesSource.next([...currentMessages, message]);
    setTimeout(() => this.remove(message), message.life || MESSAGE_TIMEOUT);
  }

  remove(message: Message): void {
    const currentMessages = this.messagesSource.getValue();
    const updatedMessages = currentMessages.filter((msg) => msg !== message);
    this.messagesSource.next(updatedMessages);
  }

  clear(): void {
    this.messagesSource.next([]);
  }
}
