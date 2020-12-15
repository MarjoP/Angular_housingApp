import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';

import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/model/iproperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent=1;
  properties: Array<IProperty>;
  City= '';
  SearchCity='';
  SortbyParam='';
  SortDirection='asc';

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

    ngOnInit(): void {

      if(this.route.snapshot.url.toString()) {
        this.SellRent = 2; //Means we are on rent-property URL, else we are on Base URL
      }
      this.housingService.getAllProperties(this.SellRent).subscribe(
        data => {
        this.properties=data;
        console.log(data);
        }, error => {
          console.log(error);
        }
      );
    }

    onCityFilter() {
      this.SearchCity = this.City;
    }
    onCityFilterClear() {
      this.City='';
      this.SearchCity='';
    }

    onSortDirection() {
      if(this.SortDirection==='desc') {
        this.SortDirection = 'asc';
      } else {
        this.SortDirection = 'desc';
      }
    }
}
