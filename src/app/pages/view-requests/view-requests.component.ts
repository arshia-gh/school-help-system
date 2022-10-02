import { Component, Inject, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseRequest, Resource, Tutorial, isResource, isTutorial } from 'src/app/interfaces/Request.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss']
})
export class ViewRequestsComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  sortBy = 'None';
  orderBy = 'None';

  sortType = {
    'School': [
      'A-Z',
      'Z-A'
    ],
    'City': [
      'A-Z',
      'Z-A'
    ],
    'Request Date': [
      'Newest',
      'Oldest'
    ],
  }

  sortByChanged(): void {
    this.orderBy = this.sortType[this.sortBy][0]; //select the first sorting
    this.orderByChanged();
  }

  orderByChanged(): void {
    const resolveProp = (obj, path) => path.split('.').reduce((o, p) => o ? o[p] : null, obj);


    let propPath = {
      'School': 'school.name',
      'City': 'school.address.city',
      'Request Date': 'requestDate'
    }

    this.requests.sort((a, b) => resolveProp(a, propPath[this.sortBy]) - resolveProp(b, propPath[this.sortBy]));
    this.table.renderRows();

    if (this.sortType[this.sortBy].indexOf(this.orderBy) > 0) this.requests.reverse();
  }

  constructor(
    public requestService: RequestService,
    private schoolService: SchoolService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  };

  requests = this.requestService.requests

  displayedColumns: string[] = ['id', 'description', 'requestDate', 'city', 'schoolName'];

  showDetails(id: string): void {
    const selectedRequest = this.requests.find(req => req.id == id);
    const dialogRef = this.dialog.open(RequestDetailDialog, {
      width: '600px',
      data: selectedRequest,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this._snackBar.open(
          `Offer Submitted Successfully`,
          'OK', { duration: 2000 }
        )
      }
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'request-dialog',
  templateUrl: 'request-dialog.html',
  encapsulation: ViewEncapsulation.None
})

export class RequestDetailDialog {
  remarks: string;

  constructor(
    public dialogRef: MatDialogRef<RequestDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public request: BaseRequest,
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
