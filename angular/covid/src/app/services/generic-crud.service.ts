import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, finalize } from 'rxjs/operators';
import { API_URL } from '../app.api';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class GenericCrudService<T> {
  protected url = API_URL;
  protected abstract resource: string = '';

  constructor(protected http: HttpClient) {}

  public getModels(): Observable<T[]> {
    return this.http.get<T[]>(this.url).pipe(
      retry(3),
      finalize(() => {
        console.log('Fetching completed!');
      })
    ) as Observable<T[]>;
  }

  public getModelById(id: number | string): Observable<T> {
    const URL = `${this.url}/${id}`;
    return this.http.get<T>(URL).pipe(
      retry(3),
      finalize(() => {
        console.log('Fetching completed!');
      })
    ) as Observable<T>;
  }

  // public getModelByOther(
  //   extraUrl?: string,
  //   accessLevel?: string,
  //   resource?: string
  // ): Observable<T> {
  //   const URL = `${this.baseURL(accessLevel, resource)}/${extraUrl}`;
  //   return this.http.get<T>(URL).pipe(
  //     retry(3),
  //     finalize(() => {
  //       console.log('Fetching completed!');
  //     })
  //   ) as Observable<T>;
  // }

  // public getModelByOtherType<U>(
  //   accessLevel?: string,
  //   resource?: string
  // ): Observable<U> {
  //   const URL = this.baseURL(accessLevel, resource);
  //   return this.http.get<U>(URL).pipe(
  //     retry(3),
  //     finalize(() => {
  //       console.log('Fetching completed!');
  //     })
  //   ) as Observable<U>;
  // }

  public addModel(model: T): Observable<T> {
    return this.http.post(this.url, model).pipe(
      retry(3),
      finalize(() => {
        console.log('Updated model!');
      })
    ) as Observable<T>;
  }

  // public updateModel(
  //   model: T,
  //   id: number,
  //   accessLevel?: string,
  //   resource?: string
  // ): Observable<T> {
  //   const URL = `${this.baseURL(accessLevel, resource)}/${id}`;
  //   return this.http.put(URL, model, HTTP_OPTIONS).pipe(
  //     retry(3),
  //     // catchError((err) => {
  //     //   throw "Error while updating the model";
  //     // }),
  //     finalize(() => console.log('Update completed'))
  //   ) as Observable<T>;
  // }

  // public deleteModel(
  //   id: number,
  //   accessLevel?: string,
  //   resource?: string
  // ): Observable<T> {
  //   const URL = `${this.baseURL(accessLevel, resource)}/${id}`;
  //   return this.http.delete(URL).pipe(
  //     retry(3),
  //     finalize(() => console.log('Deletion completed'))
  //   ) as Observable<T>;
  // }
}
