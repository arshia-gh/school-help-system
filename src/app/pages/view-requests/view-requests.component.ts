import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { RequestService } from "src/app/services/request.service";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import {
  BaseRequest,
  isResource,
  isTutorial,
  Request,
  RequestStatus,
  Resource,
  Tutorial,
} from "src/app/interfaces/Request.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { SchoolService } from "src/app/services/school.service";
import { UserService } from "src/app/services/user.service";
import { OfferService } from "src/app/services/offer.service";
import { User, UserType, Volunteer } from "src/app/interfaces/User.interface";
import { Subscription } from "rxjs";
import { AuthService } from "@app/services/auth.service";

@Component({
  selector: "app-view-requests",
  templateUrl: "./view-requests.component.html",
  styleUrls: ["./view-requests.component.scss"],
})
export class ViewRequestsComponent implements OnInit {

  private requestSub: Subscription | undefined;
  private authListenerSubs: Subscription;
  private currentUser: User;

  @ViewChild(MatTable)
  table: MatTable<any>;
  filterBy = "None";
  filterValue = "None";
  filterTypes = ["School", "City", "Request Date"];
  filterOptions = [];
  source = null;
  requests = null;
  displayedColumns: string[] = [
    "id",
    "description",
    "requestDate",
    "city",
    "schoolName",
  ];

  constructor(
    private requestService: RequestService,
    private schoolService: SchoolService,
    private authService: AuthService,
    private dialog: MatDialog,
    private offerService: OfferService,
    private _snackBar: MatSnackBar,
  ) {
    this.requestService.getRequests();

    this.requestSub = this.requestService.getRequestsUpdateListener()
      .subscribe((requests: BaseRequest[]) => {
        this.requests = this.source = requests;
      });
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(user => {
        this.currentUser = user;
      })
    // this.currentUser = this.userService.currentUser;
  }

  ngOnInit(): void {
  }

  private dateOptions = ["Today", "Last 7 days", "Last 30 days"];

  private propPath = {
    "School": "school.name",
    "City": "school.address.city",
    // 'Request Date': 'requestDate'
  };

  private isFilteredByDate = () => this.filterBy === "Request Date";

  private resolveProp = (obj, path) =>
    path.split(".").reduce((o, p) => o ? o[p] : null, obj);

  filterByChanged(): void {
    this.filterValue = "None";
    this.requests = this.source;

    if (this.isFilteredByDate()) {
      this.filterOptions = this.dateOptions;
      return;
    }

    let options = this.source.map((u) =>
      this.resolveProp(u, this.propPath[this.filterBy])
    );
    this.filterOptions = [...new Set(options)];
  }

  filterValueChanged(): void {
    if (this.isFilteredByDate()) {
      let days = [0, 7, 30];
      let index = this.dateOptions.indexOf(this.filterValue);
      const minDate: Date = new Date(
        Date.now() - days[index] * 24 * 60 * 60 * 1000,
      );
      console.log(minDate);
      this.requests = this.source.filter((r) => r.requestDate > minDate);
    }

    this.requests = this.source.filter((r) =>
      this.filterValue === this.resolveProp(r, this.propPath[this.filterBy])
    );
    this.table.renderRows();
  }

  showDetails(id: string): void {
    const user = this.authService.currentUser;
    const selectedRequest = this.requestService.getById(id);
    const dialogRef = this.dialog.open(RequestDetailDialog, {
      width: "600px",
      data: new RequestData(user, selectedRequest),
    });

    dialogRef.afterClosed().subscribe((remarks) => {
      if (remarks != undefined) {
        //add to offers
        this.offerService.addOffer(id, { remarks: remarks })
          .subscribe(res => {
            if (res) {
              this._snackBar.open(
                `Successfully submitted offer to ${selectedRequest.type} [${selectedRequest.id}]`,
                null,
                {
                  duration: 2000,
                  panelClass: 'success-snackbar',
                  verticalPosition: "top"
                },
              );
            }
          });
      }
    });
  }
}

@Component({
  selector: "request-dialog",
  templateUrl: "request-dialog.html",
  encapsulation: ViewEncapsulation.None,
})
export class RequestDetailDialog {
  remarks: string;

  get isLoggedIn() {
    return this.currentUser != null;
  };

  get request() {
    return this.requestData.request;
  }

  get currentUser() {
    return this.requestData.user;
  }

  get isVolunteer() {
    return this.currentUser?.type === UserType.Volunteer
  }

  constructor(
    public dialogRef: MatDialogRef<RequestDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public requestData: RequestData) {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

class RequestData {
  user: User;
  request: Request

  constructor(user: User, request: Request) {
    this.user = user;
    this.request = request;
  }
}
