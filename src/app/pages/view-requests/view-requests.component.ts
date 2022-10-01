import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request, Resource, Tutorial, isResource, isTutorial } from 'src/app/interfaces/Request.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss']
})
export class ViewRequestsComponent implements OnInit {
  filterBy = 'None';
  sortBy = 'None';

  filterType = {
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

  filterBySelected() : void {
    this.sortBy = this.filterType[this.filterBy][0]; //select the first sorting
  }

  constructor(public requestService: RequestService, public dialog: MatDialog, private _snackBar: MatSnackBar) { };

  requests = this.requestService.getRequest();

  displayedColumns: string[] = ['id', 'description', 'requestDate'];

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
    @Inject(MAT_DIALOG_DATA) public request: Request,
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
