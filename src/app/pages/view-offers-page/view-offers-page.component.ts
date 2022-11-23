import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer, OfferStatus } from '@app/interfaces/Offer.interface';
import { Request, RequestStatus } from '@app/interfaces/Request.interface';
import { OfferService } from '@app/services/offer.service';
import { UserService } from '@app/services/user.service';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-view-offers-page',
  templateUrl: './view-offers-page.component.html',
  styleUrls: ['./view-offers-page.component.scss']
})
export class ViewOffersPageComponent implements OnInit {

  requestId: string;
  fetchRequest$ = new BehaviorSubject<void>(undefined)
  request$: Observable<Request>;

  displayedColumns: string[] = ['id', 'dateOffered', 'remarks'];

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private offerService: OfferService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.request$ = this.fetchRequest$.pipe(
      switchMap(
        () => this.route.params.pipe(
          switchMap(params => this.requestService.findById(params['requestId']))
        )
      )
    )
  }

  showDetails(id: string): void {
    this.request$.subscribe(request =>
      this.dialog.open(OfferDetailDialog, {
        width: '600px',
        data: request.offers.find(offer => offer.id === id),
      })
    )
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
    if (status === 'Accepted') {
      this.offer.request.status = RequestStatus.Closed
    }
  }

  get isReviewable() {
    return this.offer.status === OfferStatus.Pending
      && this.offer.request.status === RequestStatus.New
  }
}
