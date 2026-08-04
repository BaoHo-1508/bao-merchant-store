import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EstoreApiService } from '../../services/estore-api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  // API-driven only, exactly like the header: never seed a literal store name.
  // A hardcoded fallback would flash the wrong name on reload before the store
  // API responds. Empty string simply renders the mark with no wordmark.
  storeName = '';
  readonly year = new Date().getFullYear();

  constructor(private api: EstoreApiService) {}

  ngOnInit(): void {
    this.api.getStore().pipe(catchError(() => of(undefined))).subscribe(store => {
      if (store?.name) {
        this.storeName = store.name;
      }
    });
  }
}
