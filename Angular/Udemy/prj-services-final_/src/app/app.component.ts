import { LoggingService } from "./logging.sevice";
import { AuthService } from "./auth/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  // notas: string[];
  // disponiveis: string[];
  // notaAnterior: string;
  // timeout: number;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoLogin();
    // this.notas = ["1...", "2...", "3..."];
    // this.disponiveis = ["1", "2", "3", "4"];
    // this.timeout = 2000;
    // //this.notaAnterior = "3";

    // let novaNota = "";
    // while (1) {
    //   const novoIndex = Math.round(
    //     Math.random() * (this.disponiveis.length - 1)
    //   );
    //   novaNota = this.disponiveis[novoIndex];
    //   if (novaNota !== this.notaAnterior) {
    //     // setTimeout(() => {
    //     //   this.notaAnterior = novaNota;
    //     //   this.notas = this.notas.slice(1, 3);
    //     //   this.notas.push(novaNota);
    //     // }, this.timeout);
    //     this.timeout = this.timeout * 0.95;
    //   }
    // }
  }
}
