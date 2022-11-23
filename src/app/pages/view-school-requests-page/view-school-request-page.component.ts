import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { Router } from "@angular/router";
import { Request } from "@app/interfaces/Request.interface";
import { CompleteSchoolAdmin, isAdmin, } from "@app/interfaces/User.interface";
import { AuthService } from "@app/services/auth.service";
import { RequestService } from "@app/services/request.service";
import { filter, map, Observable, switchMap } from "rxjs";
import { CreateRequestDialog } from "./create-request-dialog/create-request-dialog.component";
import { ViewRequestDetailDialog } from "./view-request-details-dialog/view-request-dialog.component";

@Component({
  selector: 'app-view-school-request-page',
  template: `
  <div *ngIf="admin$ | async as admin" fxLayout="row" fxLayoutAlign="start end">
    <div>
      <h2>School: {{admin.school.name}}</h2>
      <p *ngIf="school$ | async as school">
      Located at: {{school.address.street}}, {{school.address.state}}, {{school.address.city}}
      </p>
      <p>Your position: {{admin.position}}</p>
    </div>
    <button mat-raised-button color="primary" class="ms-auto" (click)="createRequestClicked()">
      Create Request
    </button>
  </div>


  <div *ngIf="requests$ | async as requests" fxLayout="column" class="mat-elevation-z5 mt-3">
    <table #table mat-table [dataSource]="requests" class="w-100">

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> Request ID </th>
        <td mat-cell *matCellDef="let req"> {{req.id}} </td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Description </th>
        <td mat-cell *matCellDef="let req"> {{req.description}} </td>
      </ng-container>

      <ng-container matColumnDef="requestDate">
        <th mat-header-cell *matHeaderCellDef> Request Date </th>
        <td mat-cell *matCellDef="let req"> {{req.requestDate | date: 'dd MMMM, yyyy'}} </td>
      </ng-container>

      <ng-container matColumnDef="options">
        <th mat-header-cell *matHeaderCellDef>More</th>
        <td mat-cell *matCellDef="let req">
          <button mat-button [matMenuTriggerFor]="menu">
            <mat-icon aria-hidden="false" fontIcon="more_vert"></mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="showDetails(req.id)">View Details</button>
            <button mat-menu-item (click)="showOffers(req.id)">View Offers</button>
          </mat-menu>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let req; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator showFirstLastButtons [length]="1" [pageSize]="10" [pageSizeOptions]="[10, 25, 100]"
      aria-label="Select page">
    </mat-paginator>
  </div>
  `,
})
export class ViewSchoolRequestPageComponent {
  @ViewChild(MatTable) private _table: MatTable<any>

  requests$: Observable<Request[]>
  admin$: Observable<CompleteSchoolAdmin>

  requests: Request[]
  displayedColumns: string[] = ['id', 'description', 'requestDate', 'options']


  constructor(
    _authService: AuthService,
    _requestService: RequestService,

    private _router: Router,
    private _dialog: MatDialog,
  ) {
    this.requests$ = _authService.user$.pipe(
      filter(isAdmin),
      switchMap(user => _requestService.getSchoolRequests(user.school))
    )
    this.admin$ = _authService.admin()
  }

  createRequestClicked() {
    const dialog = this._dialog.open(CreateRequestDialog, {
      width: '600px',
      disableClose: true,
    })

    dialog.afterClosed().subscribe(() => {
      this._table.renderRows()
    })
  }

  showDetails(id: string): void {
    const selectedRequest = this.requests.find(req => req.id == id);
    this._dialog.open(ViewRequestDetailDialog, {
      width: '600px',
      data: selectedRequest,
    });
  }

  showOffers(requestId: string): void {
    this._router.navigate(['/dashboard/offers', requestId]);
  }

  get school$() {
    return this.admin$.pipe(map(admin => admin.school))
  }
}
