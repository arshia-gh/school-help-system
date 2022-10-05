import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer } from '@app/interfaces/Offer.interface';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-view-offers-page',
  templateUrl: './view-offers-page.component.html',
  styleUrls: ['./view-offers-page.component.scss']
})
export class ViewOffersPageComponent implements OnInit {

  requestId;
  request;
  displayedColumns: string[] = ['id', 'dateOffered', 'remarks'];


  constructor(private route: ActivatedRoute, private requestService: RequestService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.requestId = params['requestId']);
    this.request = this.requestService.getById(this.requestId);
  }

  showDetails(id: string): void {
    alert(id)
  }

}
