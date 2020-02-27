import { MessageService } from "./../message.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  messages: string[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.messages;
  }

  onClear() {
    console.log(this.messageService.messages);
    this.messageService.clear();
    console.log(this.messageService.messages);
  }
}
