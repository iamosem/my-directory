import { Component } from '@angular/core';
import { ICompany } from '../model';
import { SAMPLE_DATA } from '../constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  suggestions: ICompany[] = null;

  constructor() { }

  performSearch(search: any) {
    if (null != search && 'value' in search) {
      const searchStr = search.value.toLowerCase();
      this.suggestions = SAMPLE_DATA.filter(d => {
        return d.name.toLowerCase().includes(searchStr) || d.address.toLowerCase().includes(searchStr) ||
          d.contactInfo.toLowerCase().includes(searchStr);
      });
    } else {
      this.suggestions = null;
    }
  }

}
