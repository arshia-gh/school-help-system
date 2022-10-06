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

@Component({
  selector: "app-view-requests",
  templateUrl: "./view-requests.component.html",
  styleUrls: ["./view-requests.component.scss"],
})
export class ViewRequestsComponent implements OnInit {
  @ViewChild(MatTable)
  table: MatTable<any>;
  filterBy = "None";
  filterValue = "None";
  filterTypes = ["School", "City", "Request Date"];
  filterOptions = [];
  source = this.requestService.requests.filter(r => r.status === RequestStatus.New);
  requests = this.source;
  displayedColumns: string[] = [
    "id",
    "description",
    "requestDate",
    "city",
    "schoolName",
  ];
  currentUser: User;

  constructor(
    private requestService: RequestService,
    private schoolService: SchoolService,
    private dialog: MatDialog,
    private userService: UserService,
    private offerService: OfferService,
    private _snackBar: MatSnackBar,
  ) {
    this.currentUser = this.userService.currentUser;
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
    const selectedRequest = this.requestService.getById(id);
    const dialogRef = this.dialog.open(RequestDetailDialog, {
      width: "600px",
      data: selectedRequest,
    });

    dialogRef.afterClosed().subscribe((remarks) => {
      if (remarks != undefined) {
        //add to offers
        const newOffer = this.offerService.addOffer({
          remarks: remarks,
          request: selectedRequest,
          volunteer: this.currentUser as Volunteer,
        });

        const volunteer = this.currentUser as Volunteer;
        selectedRequest.offers.push(newOffer);
        volunteer.offers.push(newOffer);

        this._snackBar.open(
          `Offer Submitted Successfully`,
          "OK",
          { duration: 2000 },
        );
      }
    });
  }

  ngOnInit(): void {
  }
}

@Component({
  selector: "request-dialog",
  templateUrl: "request-dialog.html",
  encapsulation: ViewEncapsulation.None,
})
export class RequestDetailDialog {
  remarks: string;
  isLoggedIn = false;
  isVolunteer: boolean;

  constructor(
    public dialogRef: MatDialogRef<RequestDetailDialog>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public request: BaseRequest,
  ) {
    this.isLoggedIn = userService.currentUser != null;
    this.isVolunteer = this.isLoggedIn &&
      userService.currentUser.type === UserType.Volunteer;

    this.userService.authEvent.subscribe((e) => {
      this.isLoggedIn = e.type === "login";
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
