import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer, OfferStatus } from '@app/interfaces/Offer.interface';
import { Request, RequestStatus } from '@app/interfaces/Request.interface';
import { OfferService } from '@app/services/offer.service';
import { UserService } from '@app/services/user.service';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Observable, subscribeOn, switchMap, tap } from 'rxjs';
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
          switchMap(params => this.requestService.findById(params['requestId']).pipe(tap(console.log)))
        )
      )
    )
  }

  showDetails(id: string): void {
    this.request$.subscribe(request => {
      const dialog = this.dialog.open(OfferDetailDialog, {
        width: '600px',
        data: [request, request.offers.find(offer => offer.id === id)],
      })
    })
  }

}

@Component({
  selector: 'offer-details',
  templateUrl: './offer-details.html',
  encapsulation: ViewEncapsulation.None
})

export class OfferDetailDialog {
  request: Request
  offer: Offer
  constructor(
    public dialogRef: MatDialogRef<OfferDetailDialog>,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private offerService: OfferService,
    @Inject(MAT_DIALOG_DATA) [request, offer]: [Request, Offer],
  ) {
    this.request = request;
    this.offer = offer
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get volunteerAge() {
    const { dob } = this.offer.submittedBy
    return dayjs(new Date()).diff(dob, 'years')
  }

  reviewOffer(status: string) {
    if (status === OfferStatus.Accepted) {
      this.offerService.acceptOffer(this.request.id, this.offer.id).subscribe(() => {
        this.offer.status = OfferStatus.Accepted
      })
    } else {
      this.offerService.rejectOffer(this.request.id, this.offer.id).subscribe(() => {
        this.offer.status = OfferStatus.Rejected
      })

    }
  }

  get isReviewable() {
    return this.offer.status === OfferStatus.Pending
    && this.request.status === RequestStatus.New
  }
}
