// import { CollectionViewer } from '@angular/cdk/collections';
// import { DataSource } from '@angular/cdk/table';

// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { catchError, delay, finalize } from 'rxjs/operators';

// import { GenericCrudService } from './generic-crud.service';

// export class GenericDataSource<T, U extends GenericCrudService<T>>
//   implements DataSource<T> {
//   private genericSubject = new BehaviorSubject<T[]>([]);

//   private loadingSubject = new BehaviorSubject<boolean>(false);
//   public loading$ = this.loadingSubject.asObservable();

//   private qtGenericSubject = new BehaviorSubject<number>(0);
//   public qtGeneric$ = this.qtGenericSubject.asObservable();

//   constructor(private genericService: U) {}

//   loadGeneric(
//     filter = '',
//     sortColumn = '',
//     sortDirection = 'asc',
//     pageIndex = 0,
//     pageSize = 20
//   ) {
//     this.loadingSubject.next(true);
//     this.genericService
//       .getModels(API_ACCESS_LEVELS.restrito, {
//         filter: filter,
//         sortColumn: sortColumn,
//         sortDirection: sortDirection,
//         pageIndex: pageIndex,
//         pageSize: pageSize,
//       })
//       .pipe(
//         //delay(1000),
//         catchError(() => of([])),
//         finalize(() => this.loadingSubject.next(false))
//       )
//       .subscribe((generic) => {
//         //console.log(generic);
//         this.genericSubject.next(generic['content']);
//         this.qtGenericSubject.next(generic['totalElements']);
//       });
//   }

//   connect(collectionViewer: CollectionViewer): Observable<T[] | readonly T[]> {
//     return this.genericSubject.asObservable();
//   }

//   disconnect(collectionViewer: CollectionViewer): void {
//     this.loadingSubject.complete();
//     this.genericSubject.complete();
//     this.qtGenericSubject.complete();
//   }
// }
