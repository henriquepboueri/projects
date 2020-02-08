import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { rejects } from "assert";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  projectStatus: string[] = ["Stable", "Critical", "Finished"];
  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, this.forbiddenNames.bind(this)],
        [this.ForbiddenNamesAsync]
      ),
      email: new FormControl(null, [Validators.required, Validators.email], []),
      projetctStatus: new FormControl(null, [Validators.required], [])
    });
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (control.value === "Test1") {
      return { nameIsForbidden: true };
    }
    return null;
  }

  ForbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, rejects) => {
      setTimeout(() => {
        if (control.value === "Test2") {
          resolve({ nameIsForbidden: true });
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
