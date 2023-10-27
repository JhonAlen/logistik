import { Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-issuance-of-notes',
  templateUrl: './issuance-of-notes.component.html',
  styleUrls: ['./issuance-of-notes.component.scss']
})
export class IssuanceOfNotesComponent {

  issuanceForm!: FormGroup;
  currentUser!: any;
  cedentList: any[] = [];
  insuredList: any[] = [];
  tradeList: any[] = [];
  coinList: any[] = [];

  //Controles
  cedentsControl = new FormControl('');
  insuredControl = new FormControl('');
  tradeControl = new FormControl('');
  coinsControl = new FormControl('');

  //Filtros
  filteredCedents!: Observable<string[]>;
  filteredInsured!: Observable<string[]>;
  filteredTrade!: Observable<string[]>;
  filteredCoins!: Observable<string[]>;

  constructor(private router: Router,
              private route: ActivatedRoute, 
              private http: HttpClient,
              private formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.issuanceForm = this.formBuilder.group({
      ccedente: [''],
      cmoneda: [''],
      casegurado: [''],
      cramo: [''],
      cpais: [''],
    });
  
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      this.currentUser = JSON.parse(isLoggedIn);
      this.getCedents();
      this.getInsured();
      this.getTrade();
      this.getCoins();
    }
  }

  getCedents() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/cedents', data).subscribe((response: any) => {
      if (response.data.cedents) {
        for (let i = 0; i < response.data.cedents.length; i++) {
          this.cedentList.push({
            id: response.data.cedents[i].ccedente,
            value: response.data.cedents[i].xdescripcion
          });
        }
        this.filteredCedents = this.cedentsControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      }
    });
  }

  getInsured() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/insured', data).subscribe((response: any) => {
      if (response.data.insured) {
        for (let i = 0; i < response.data.insured.length; i++) {
          this.insuredList.push({
            id: response.data.insured[i].casegurado,
            value: response.data.insured[i].xdescripcion
          });
        }
        this.filteredInsured = this.insuredControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterInsured(value || ''))
        );
      }
    });
  }

  getTrade() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/trade', data).subscribe((response: any) => {
      if (response.data.trades) {
        for (let i = 0; i < response.data.trades.length; i++) {
          this.tradeList.push({
            id: response.data.trades[i].cramo,
            value: response.data.trades[i].xdescripcion
          });
        }
        this.filteredTrade = this.tradeControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterTrade(value || ''))
        );
      }
    });
  }

  getCoins() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/coin', data).subscribe((response: any) => {
      if (response.data.coins) {
        for (let i = 0; i < response.data.coins.length; i++) {
          this.coinList.push({
            id: response.data.coins[i].cmoneda,
            value: response.data.coins[i].xdescripcion
          });
        }
        this.filteredCoins = this.coinsControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCoins(value || ''))
        );
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cedentList
      .map(cedent => cedent.value)
      .filter(cedents => cedents.toLowerCase().includes(filterValue));
  }

  private _filterInsured(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.insuredList
      .map(insured => insured.value)
      .filter(insureds => insureds.toLowerCase().includes(filterValue));
  }

  private _filterTrade(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tradeList
      .map(trade => trade.value)
      .filter(trades => trades.toLowerCase().includes(filterValue));
  }

  private _filterCoins(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.coinList
      .map(coin => coin.value)
      .filter(coins => coins.toLowerCase().includes(filterValue));
  }

  onCedentsSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedCedent = this.cedentList.find(cedent => cedent.value === selectedValue);
    if (selectedCedent) {
      this.issuanceForm.get('ccedente')?.setValue(selectedCedent.id)
    }
  }

  onInsuredSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedInsured = this.insuredList.find(insured => insured.value === selectedValue);
    if (selectedInsured) {
      this.issuanceForm.get('casegurado')?.setValue(selectedInsured.id)
    }
  }

  onTradeSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedTrade = this.tradeList.find(trade => trade.value === selectedValue);
    if (selectedTrade) {
      this.issuanceForm.get('cramo')?.setValue(selectedTrade.id)
    }
  }

  onCoinsSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedCoin = this.tradeList.find(trade => trade.value === selectedValue);
    if (selectedCoin) {
      this.issuanceForm.get('cmoneda')?.setValue(selectedCoin.id)
    }
  }

}
