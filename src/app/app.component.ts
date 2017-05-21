import { Component, OnInit } from '@angular/core';

import { DataService } from './_gnosiss_services/data.service';
import { AuthService } from './_gnosiss_services/auth.service'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    translate: TranslateService,
    private dataService: DataService,
    private authService: AuthService
  ) {
    translate.addLangs(["en", "zh"]);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
  }
  title: string = "GNoSISS";

  //site settings
  private api = "/assets/data/gnosiss.json";

  public site = {
    site: "",
    caseNumber: "",
    auth0: {
        domain: "",
        client: ""
    }
  };

  ngOnInit() {
    //get site settings for case number
    this.dataService.getRawData(this.api).subscribe(
      (resSite) => {this.site = resSite[0]},
      (resError) => {console.error(resError)}
    );
  }
}
