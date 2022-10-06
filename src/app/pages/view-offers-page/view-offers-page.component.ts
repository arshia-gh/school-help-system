import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer, OfferStatus } from '@app/interfaces/Offer.interface';
import { Request, RequestStatus } from '@app/interfaces/Request.interface';
import { OfferService } from '@app/services/offer.service';
import { UserService } from '@app/services/user.service';
import * as dayjs from 'dayjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-view-offers-page',
  templateUrl: './view-offers-page.component.html',
  styleUrls: ['./view-offers-page.component.scss']
})
export class ViewOffersPageComponent implements OnInit {

  requestId: string;
  request: Request;
  displayedColumns: string[] = ['id', 'dateOffered', 'remarks'];

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private offerService: OfferService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.requestId = params['requestId']);
    this.request = this.requestService.getById(this.requestId);
  }

  showDetails(id: string): void {
    const selectedOffer = this.offerService.getById(id);
    console.log();

    const dialogRef = this.dialog.open(OfferDetailDialog, {
      width: '600px',
      data: selectedOffer,
    });
  }

}

@Component({
  selector: 'offer-details',
  templateUrl: './offer-details.html',
  encapsulation: ViewEncapsulation.None
})

export class OfferDetailDialog {
  constructor(
    public dialogRef: MatDialogRef<OfferDetailDialog>,
    private userService: UserService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public offer: Offer,
  ) {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get volunteerAge() {
    const { dob } = this.offer.volunteer
    return dayjs(new Date()).diff(dob, 'years')
  }

  reviewOffer(status: string) {
    this.offer.status = OfferStatus[status]
    this.offer.request.status = RequestStatus.Closed
  }

  get isReviewable() {
    return this.offer.status === OfferStatus.Pending
      && this.offer.request.status === RequestStatus.New
  }
}
