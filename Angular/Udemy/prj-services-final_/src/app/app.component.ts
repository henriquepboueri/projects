import { AuthService } from "./auth/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  disponiveis: string[];
  notaAnterior: string;
  notasIniciais: string[];

  constructor(private authService: AuthService) {}
/* 
  periodicall({ time = 1000, minInterval = 100, decreaseRate = 0.9 }) {
    console.log(time);

    let novaNota = null;
    while (true) {
      const novoIndex = Math.round(
        Math.random() * (this.disponiveis.length - 1)
      );
      novaNota = this.disponiveis[novoIndex];
      if (novaNota !== this.notaAnterior) {
        this.notaAnterior = novaNota;
        break;
      }
    }
    this.notasIniciais = this.notasIniciais.slice(1, 3);
    this.notasIniciais.push(novaNota);

    const newTime =
      time * decreaseRate > minInterval ? time * decreaseRate : time;

    setTimeout(() => {
      this.periodicall({ time: newTime });
    }, time);
  } */

  ngOnInit() {
    this.authService.autoLogin();
/* 
    this.notasIniciais = ["1...", "2...", "3..."];
    this.disponiveis = ["C", "D", "E", "F", "G"];

    this.periodicall({}); */
  }
}
