import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { CovidService } from '../services/covid.service';

@Component({
  selector: 'app-covid-anamnese',
  templateUrl: './covid-anamnese.component.html',
  styleUrls: ['./covid-anamnese.component.css'],
})
export class CovidAnamneseComponent implements OnInit {
  public formCovid: FormGroup = new FormGroup({});
  public usaMedic: boolean = false;
  search = new FormControl();
  pacientes: any;
  usuarios: any;
  isPaciente = true;
  isLoading = false;
  errorMsg: string;

  constructor(private _fb: FormBuilder, private covidService: CovidService) {}

  initEmptyForm() {
    this.formCovid = this._fb.group({
      id__paciente: 0,
      id__usuario: 0,
      data_cadastro: new Date(),
      diag_covid: false,
      febre: false,
      prob_resp: false,
      viagem: false,
      contato_infect: false,
      contato_sintomas: false,
      part_reuniao: false,
      prob_card_resp: false,
      prob_outro: false,
      usa_medic: false,
      medic_desc: '',
      temperatura: 0,
      obs: '',
      assinatura:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAU7ElEQVR4Xu2dB+w1TVWHfwQDqGBDxR4FBRV7RyU2UFGkJSACoghWREQUayzRaJAiCtgooiAKVtAIiEEJTQEb2Aso2EAsoNii0Tyfu8lxnL07s3t3Z+f+fyd5833ve3d2zj4ze3bmzJkz15LFBEzABDohcK1O9LSaJmACJiAbLHcCEzCBbgjYYHXTVFbUBEzABst9wARMoBsCNljdNJUVNQETsMFyHzABE+iGgA1WN01lRU3ABGyw3AdMwAS6IWCD1U1TWVETMAEbLPcBEzCBbgjYYHXTVFbUBEzABst9wARMoBsCNljdNJUVNQETsMFyHzABE+iGgA1WN01lRU3ABGyw3AdMwAS6IWCD1U1TWVETMAEbLPcBEzCBbgjYYHXTVFbUBEzABst9wARMoBsCNljdNJUVNQETsMFyHzABE+iGgA1WN01lRU3ABGyw3AdMwAS6IWCD1U1TWVETMAEbLPcBEzCBbgjYYHXTVFbUBEzABst9wARMoBsCNljdNJUVNQETsMFyHzABE+iGgA1WN01lRU3ABGyw3AdMwAS6IWCD1U1TWVETMAEbLPcBEzCBbgjYYHXTVFbUBEzABst9wARMoBsCNljdNJUVNQETsMFyHzABE+iGgA1WN01lRU2gisB7SvqTqhIdXGyD1UEjWUUTqCTw38P1D5X0VZVlD335ngbrCyRdV9LLJf3KoalYuTkCny3p2pL+zG05h2r3399X0u8OtfKefcLuGmxY4V4G63aSnjY8x70kPWHDZ/KttyVwG0m/MFTBi3FfSc/dtkrfvZLAOMKi2F7veKWKyy7f62E+XtIvDyp+oaQfXKauSx2AwIdKemmix29J+ilJ33YA/ayCFA0WI6yLmdHsZbBuJukPhp6EscJoWfokwNT+A4aRVfoEFzcF6bOJ9EOSPnfQ/faSnt7pc/w/tfcyWFT895LeevB7vMelALxizxGn9jhz+fstMwwu6qveYRs/WtKXXOKMZk+D9UpJ7z5A3LPeDvvbYVW+laRnD9rdZfjvUzPa/oSk772kqchhWySv2DdL+qbhp4sa9e5pOJ4v6WMGiDhq6dB7yVtJupukfxkqZHXrIyT9o6RbSPpzSW8cFgb+aC+lOqznwZIelLRhfDniI13Ui9JZW0Wf8UW1w54GC6c7IJFvkURH30P42n+6pDctrOzfJH39MO+/uMC7QgZTl/2OpJtnRslTRuv7JX3xyjqPVHycIaATH70jy+h4f4Okd5XEf7uXPQ1WXLnYy+r/nKTbrmilPQ3rCjV3KUrk9B+HmlI/1Z0lpdND/JafLOnXd9Fwm0rQnw/tl0q6QaiCPsxM4fe2qXb1XeMAAf0vIvSklcGiNbau++6SnrS62f/36/QXZ7hP77eAwTufMFj8xIvxM5KYgkfZ2gnPquXHDlP+txum+DnfWm0bMHIkSPbGEwUZZbHocMT+EaeFuF8wrt3L1kZjBESEO1OtKO8m6dUbEqTD8tU/Jf8q6SmSXjN8Qd88c/Feo8ENUay+NSOLdEpxygg9axhZjRVvNVIlxOI+kj4884R/O0zr+X2JvHDwb86VJXiW0dfRYp1uLekXB+X/RtL7DD7buec59O97GSy+ekwn3jLQ+LANpwrx6zJWyUv0RcNf+DLyEv5T0Ie/v5+kB2QMHdOhPz10S26rXI4nL8QvTVSbmx4+YmB7Lk1/QBIGa06WfHB+ZBhZzd17/P3bB79n6fV7XPdBkn4zVHRHST+7R8Vb1rG1wWJf09tLwmARMBqnCg+U9PCNHi73gpV+5YkVe5Wk6wfdHlP4cmz0OM1vi2HAQER5b0l/eEKz1BHPSuyXn+mleZykz6ugUtr24y0ZcdNvU2EzMbFnN01++Ktkulyh2qaXtvAbb/pASw0W83qmeKwYvTaMSMaQgJIvHw/2H5IYrjI9RBj5/N3Q+K+X9OJhhYN/p8O/oyRWqh45Q2WNweLWzxt8ImM1F7frvbJXxUBEir5M0gfO3IOP009K+qTkum+V9JwVU6i4uTdVgTCV1H82XvPBkthCNCe5FU8c2J8YCubcDWtHMIxK+VjyTowrkGunmdFg/bOkjzzwIsFcu1zz+xKDFTe/FlWywUVfLek7T9x3rcFKy1/17URxqwfYXyDpG4aRBnsLWUm7zjDF/40QsgJHIq5TXyI+H4zgErmfpO9JCqYjKNrr85NrCFF5r4IKU4OF2wCn++tCWV78X03utcSxTSzgVw73h2MqDArgxHR6iWM/rhRy79qRZgGufS9ZYrBym1/31VqaM1g5Jz+jwdIl6LTTLvGD7M1ky/oYUb1/qOAfhtFArs5fk/RR4YecP2vpx5JyadswQmfknQr+G/w4UUpe2PQln9I1vQ5/Hn69EnkLSY8tWBSK9/rRYVSK4S0deTFtZvo8CuEl+I67lSUGi4fly4lfapwSjvN95vLIZw3/peNeb4IOU7x/l0QHJ3QAYSjMkJgpIk5wNkzfZPj3mikh94rD4alON9VwF/dlWtlDcy//1C1ZnUv9P7lpFgG94/aeGvXS0e/Ux4QwB6b2qbCPdSroM2dcp0bXZKyIoyJWC1m0mZOpINu5cuPvX1bgEhmvpR3wx0XpOlvKUoNVCne8DuOGryvKlrE5RCSzdzFKzapkOqLYi1Mt1z2ur3EBMG3Cv5OL+eFF/biw2wHd8SnhW6qV0o9RzjgwUrnHRIU539RUP02vxQjObepnkYlV6FIhlIRnjavrGOHvGuLdSu5DHjoWCkZ5hqRPKyl4xGv2fBGZ8zP3H2XLut9WEl/6KPeW9PjCRiA+K44Mt9S1UKVml8UNzyjBogij4HEaxotK/BqhAPgV0w9TqngajsDCSuwXJQ/K1OZDhgvxMTHFmpLcFC/38WJPKbFXUV4xjPBz984Zw1P9JPUDjvdkeg0z2P32wHcMu2EEN+aRizrgz2L7GMznJOfzq3GPzN1/19/3fBFjxznVEc4FgK9T3EpRmun0XZKA1tKh/rn0PuJ94ojmaySxCRphJFu7p+4zJf148pBkoKV9SuWvJb3DcPF/SXqTEwVzCzA5B3w6auOWc30mLTMVDM2IiJCOVB4i6RszQdXxOnYO3CFTtsavmurZ7ar3ngYLJyOjHIQUu2xI3kpykdl3KhxGk5YjbszeO7PEVkyW3pdVvriidw4fSM44lDjEx2eIqYr4t1N+KX5/pqRPSQDE+n5M0l2T30s+VKnrAJ8cvrkoGExGV3HjNAaTqeHPFzQK/mBCJnK7NlgJ5b2ak9KFhLn7NP99T4MVh8Q1X4elkNKX4lRk9lgHG6W/O+wdY1rJ8DmdXi7VqcdyTw6LKOh/Dt/jlOP5zSQxHZ+TWoPF/dL+MK5mPmrC5zY3uuKeqSHIsUmd80sZ0jcxhtFVgR+NEeucYPRoxyifUWgw5+696++tDFbtFKAWCl9LvppRSubtxBBFJzBTH6ZAV1miz2nOX1TDKefgZqr3TgU3SQ1FST/OGUlip8bMnLHa0v6ZGs40HTFpivlQR6kZSaYo0ucmG0l0qJ9ClxrsLvt2SUMX9J+iS2LH3zoQMx0VzA3vGW4zFRxzPfFALBJ8bUXMSxGEDi+KIQ2MFnIbjZc8FlMlVs3SVUIi6Jlq1bx8paO+3NQorYco/DQ6f0oXIuvjCl46NU23EOFYJ4ZwqaQLFvjGvqLwZmmqpa3fwUK16i7b02DFzrL1lDBd5ZvaePvRg6EiUjsKmUn5Oqb+iDq6l3H1X4ZRT+nIo/TJcw7xkuDGdLRQarDmUg6xORg/K3m8SoQV07cJF6ZO96V6TtWd3q9mtJYL9dnz/S/hOXvNngrHsIYtDRZ7yVgqjpI2LP6Ae044MllaxrGMj+OqCy8gAbujxBXCc7FJp2q0HacsnfIbkjljzFFF8DGBxyV+RowLexlz00BCBUhFQ1aPUiE9EqvKo8RwidxuC4KgWSFfKqXxZ1P3Z1WSrUCjlBr6pfqevdyeBotz61ipQ35fEptYt5IphztTv0+d2On/oqGzsrG69Au7lf5HuW+6Davmi176DGkYCeXmHN7/OZw8zbW09Q0zH6mp+okfY+Q8ni/AdcTncQpQbbunPqy4gkqwNMYpZv1YayDSfk1k/XjKcynveI8t2rNUj0XX7Wmw4vx7yxFWbq8jS8h8kQmiywmbeXHUL9lgugh8J4W+L+QQQ+W1L9zUYzOqJWvoKKe27eTaNxdOUIqYkRCjtCWSjljSDdBxOs391/qNGH3GbBQ1uzfG53tY8HvR79nC1I3sabDiiknJNoalEHMd+tRm3SW77Jfq1lu5GDtHehJ2ECx9uU89O1PN7wgXcHAFB1jkJNe+54gNW9I28RQhyqf7KHMBoyxapCdnl9adhkgsMVhMS9ldMPre5vKaleq2y3WXaLByzsUpmDUbSXdpkINVEldbCfnIpUA5h8pMC1ntYiQ81ya59p2bQp5Dx9w9CEYlKDVKfKfG/G3RMc82nBstVOgcBouq457GmpXGhWqfr9ieBit1rrKTvMRRWvu0uSj39B5HP/Gk9pm3uD5dwTvKSDS3kX7NlHANu9ye1XSlMJcBoiQmMKfXuVYdycM1LiqVrMquYXTWsnsarLThlgxnSx7+VEZKyreaPpTofqRr0iyjS1+yLZ7pXC/uWt0wnrg3iNAfJZd5lPMMOBdglKXO7nguJPda89GPexRbGfxq/nsarPSLvbTR5h6S/Ou5k1J4Acl0aSkjwNSFFxKZC7wtu+P5riLvWkzaR3Q8UfItJHKi/lxwaDq7eMlw8nitvqTvYUV0lJIg26k6ok+ZlXGm4oeXSzNYuX1bNMIW8UOHb9wVCu71cVmqYhz9nTuYtVan1PGeW1DK+d2WrLgSdkHe91HWzhbi6dCk1ynNyFvL6GzX72mwUDoO5c+5UsgLxibWuLUmQlrSOc4GucMbpSOCo/GLp/jU7KfboinS/YJk+BxT38T60nxYL09COUp0S48fW2usY2aSmnxxJbpucs3eBiuOgDhhh4jmtQLouRQbc+lH1upwaeVj6MARnbLRoG7lWihtU1b8yCs/ypQBJcvpE5ObkgKcA05LJXcYyJo4qjiSZudHql+pXrtdt7fBisvk5ziNNk3fi6+FrRdpgritT5nercF2rAi2fFBYUS05HmtH1a7JDTUeRX8EhzGsOMmHjeKECbBrIie5DBWnUjan90gN1jl8i3yccN6TOvnwsrfBSpPBrZ1qxJHA1w1fCAIb2TIRj51fe2bc4RvyiinY3cggtE+6YZqfOHGHP09JMriysMCCArmr+P/0vM+1kfPddZu9DVZ6fPY5hvN0XnJ6Pz3Qj5tj+eejxBB110EOrHBXI4PAMXcYR8Q8ppxmDyJxXqdk7Qf/wM2bV21vg4UWeyyXp0Pv9Ky87hrKCl8UAYwWs40xbGTJw3V9+s2SB6ZMC4OVJiHbIiAxF118S0nPXwrK5UzgzARIW3z/BScGXekZQwuDlS6Zn2NamOtLaeqPqROCz9wPfTsTqCLAEWcEbpK59KaZkm+URKApU0Vyk+HUf31VDRd0cQuDVXpy71rM7P5P87FvZRzX6uryJgABUuywMsusgxVAZgStIvgP2SItDBYgYrrktdG6U2BzieHsyzpkN7RSJlBGoJXBwtmIn4k9YcT5kMx/C8mdlOJR1hakfU8T2IFAK4O1w6NdU0VulMW/d5UDaC9YrscEjk7g0g0W/IlAzqVGZmSHj2vJYRP44RDuYTEBE9iJwFUwWKDMbYkYEWOwXiiJfV2kUmZ1kTQeYwBfbAoMFfEz47HhVy7SeKd+6WpMIEvgqhisO0i628SxXlNdg2yoLCnzh71Wr5pIEXxVGPoVMoHmBK7ayzaV3G9pQ5w63WXpPV3OBExggsBVM1gjBjKPPlASidWWCKMv9ieyCmkxgZ4JPGiYObBSfx1JT9t45X4Vq6tqsEZo+KQ+Z/jLtYdDVq8niVxd8YSYMdr4uZI4EJbkaxYT6J1Auk1ufB7O53zcET/IV91gnepwhESQnI0EdhYTuDQCT5J095mHYtRFaqbDrIbbYF1aN/TzmMA8gTSt81yJLU9qn6v7//xug1WFyxebwEUQyE0FcYPkNl/HB25uL5orcBHN74cwgb4IpJlMxp0fuEFYTCLDaU7wa+WO0Nvt6W2wdkPtikzgMATSg2jH/bW3kvTsQcvnSSKHXBRWx4lJbCY2WM3Qu2ITaELgBpLekNRMmA8hDQ8P/84pOjeRxFFgUe47jMKaKG+D1QS7KzWBpgTSEdYrJN04aPQISQ8Y/p5e+8OScNo3ERusJthdqQk0I5CeXJUqEtMv5U6sXnt466oHt8Fahc+FTaA7ArkccfEh2G72aEkESXNmIntwozTNJ2eD1V1/s8ImsIrALYbsJEtv0vRoMRuspc3mcibQJwG2nnHUHs73WiFWi5zzzcQGqxl6V2wCzQiwGjg61VHipyXdaUYbDsVgNbHpNh0brGZ9xhWbQFMCrPSx8Z+zEV82rPzdRdJtMlqRqJI/zffV2mA17TOu3AQOR4AMJqwOknGXDCYYqa0Oial+eBusamQuYAIm0IqADVYr8q7XBEygmoANVjUyFzABE2hFwAarFXnXawImUE3ABqsamQuYgAm0ImCD1Yq86zUBE6gmYINVjcwFTMAEWhGwwWpF3vWagAlUE7DBqkbmAiZgAq0I2GC1Iu96TcAEqgnYYFUjcwETMIFWBGywWpF3vSZgAtUEbLCqkbmACZhAKwI2WK3Iu14TMIFqAjZY1chcwARMoBUBG6xW5F2vCZhANQEbrGpkLmACJtCKgA1WK/Ku1wRMoJqADVY1MhcwARNoRcAGqxV512sCJlBNwAarGpkLmIAJtCJgg9WKvOs1AROoJmCDVY3MBUzABFoRsMFqRd71moAJVBOwwapG5gImYAKtCNhgtSLvek3ABKoJ2GBVI3MBEzCBVgRssFqRd70mYALVBGywqpG5gAmYQCsCNlityLteEzCBagI2WNXIXMAETKAVARusVuRdrwmYQDUBG6xqZC5gAibQioANVivyrtcETKCagA1WNTIXMAETaEXABqsVeddrAiZQTcAGqxqZC5iACbQiYIPVirzrNQETqCZgg1WNzAVMwARaEbDBakXe9ZqACVQTsMGqRuYCJmACrQjYYLUi73pNwASqCdhgVSNzARMwgVYE/geoHU7EU1HaeAAAAABJRU5ErkJggg==',
    });
  }
  ngOnInit() {
    console.log('OnInitCovid');
    this.initEmptyForm();

    this.search.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.pacientes = [];
          this.usuarios = [];
          this.isLoading = true;
        }),
        switchMap((value) =>
          this.covidService.getPessoaByName(value).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe((data) => {
        console.log(data);
        if (data == undefined || data == []) {
          this.pacientes = [];
        } else {
          this.errorMsg = '';
          this.pacientes = data;
        }
      });
  }

  onSubmit() {
    console.log(this.formCovid.value);
  }

  onUsaMedic(v: boolean) {
    this.usaMedic = v;
  }
}
