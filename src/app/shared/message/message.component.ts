import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

import { MessageService } from '../../services/message-service/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  removeMessage(msg: Message): void {
    this.messageService.remove(msg);
  }
}
