import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { retry, finalize, map, catchError } from "rxjs/operators";
import { API_VERSION, APP_API, APP_API_APPEX } from "../app.api";
import { Injectable } from "@angular/core";

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable()
export class QueryParams {
  constructor(
    public filter?: string,
    public sortColumn?: string,
    public sortDirection?: string,
    public pageIndex?: number,
    public pageSize?: number
  ) {
    this.filter = filter || "";
    this.sortColumn = sortColumn || "";
    this.sortDirection = sortDirection || "asc";
    this.pageIndex = pageIndex || 0;
    this.pageSize = pageSize || 20;
  }
}

export abstract class GenericCrudService<T> {
  protected version: string = API_VERSION;
  protected host: string = APP_API_APPEX;
  protected abstract resource: string = "";

  constructor(protected http: HttpClient) {}

  private baseURL(accessLevel: string, resource?: string): string {
    const fixedResource = resource || this.resource;
    return accessLevel
      ? `${this.host}/${this.version}/${accessLevel}/${fixedResource}`
      : `${this.host}/${this.version}/${fixedResource}`;
  }

  public getModels(
    accessLevel?: string,
    params?: QueryParams,
    resource?: string
  ): Observable<T[]> {
    const URL = this.baseURL(accessLevel, resource);
    console.log(URL);

    return this.http
      .get<T[]>(URL, {
        params: new HttpParams()
          .set("filter", params ? params.filter : "")
          .set(
            "sort",
            params && params.sortColumn
              ? `${params.sortColumn},${params.sortDirection}`
              : ""
          )
          .set("page", params ? params.pageIndex.toString() : "0")
          .set("size", params ? params.pageSize.toString() : "20"),
      })
      .pipe(
        // map((res) => {
        //   console.log(res["content"]);
        //   return res["content"];
        // }),
        retry(3),
        finalize(() => {
          console.log("Fetching completed!");
        })
      ) as Observable<T[]>;
  }

  public getModelById(
    id: number | string,
    accessLevel?: string,
    resource?: string
  ): Observable<T> {
    const URL = `${this.baseURL(accessLevel, resource)}/${id}`;
    return this.http.get<T>(URL).pipe(
      retry(3),
      finalize(() => {
        console.log("Fetching completed!");
      })
    ) as Observable<T>;
  }

  public getModelByOther(
    extraUrl?: string,
    accessLevel?: string,
    resource?: string
  ): Observable<T> {
    const URL = `${this.baseURL(accessLevel, resource)}/${extraUrl}`;
    return this.http.get<T>(URL).pipe(
      retry(3),
      finalize(() => {
        console.log("Fetching completed!");
      })
    ) as Observable<T>;
  }

  public getModelByOtherType<U>(
    accessLevel?: string,
    resource?: string
  ): Observable<U> {
    const URL = this.baseURL(accessLevel, resource);
    return this.http.get<U>(URL).pipe(
      retry(3),
      finalize(() => {
        console.log("Fetching completed!");
      })
    ) as Observable<U>;
  }

  public addModel(
    model: T,
    accessLevel?: string,
    resource?: string
  ): Observable<T> {
    const URL = this.baseURL(accessLevel, resource);
    return this.http
      .post(URL, model, HTTP_OPTIONS)
      .pipe(retry(3)) as Observable<T>;
  }

  public updateModel(
    model: T,
    id: number,
    accessLevel?: string,
    resource?: string
  ): Observable<T> {
    const URL = `${this.baseURL(accessLevel, resource)}/${id}`;
    return this.http.put(URL, model, HTTP_OPTIONS).pipe(
      retry(3),
      // catchError((err) => {
      //   throw "Error while updating the model";
      // }),
      finalize(() => console.log("Update completed"))
    ) as Observable<T>;
  }

  public deleteModel(
    id: number,
    accessLevel?: string,
    resource?: string
  ): Observable<T> {
    const URL = `${this.baseURL(accessLevel, resource)}/${id}`;
    return this.http.delete(URL).pipe(
      retry(3),
      finalize(() => console.log("Deletion completed"))
    ) as Observable<T>;
  }
}
