import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const en = require('../assets/i18n/en.json');
const fr = require('../assets/i18n/fr.json');

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {

    if (lang === 'en') {
      return Observable.of(en);
    } else if (lang === 'fr') {
      return Observable.of(fr);
    }
    return null;
  }
}

describe('AppComponent', () => {

  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InputTextModule,
        ButtonModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: FakeLoader
          }
        })
      ],
      declarations: [AppComponent],
    });
    translate = TestBed.get(TranslateService);

  }));

  // Making default language as English after running each test
  afterAll(() => {
    translate.use('en');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should translate home label in English', () => {
    translate.use('en');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const title = fixture.nativeElement;
    expect(title.querySelector('#lblWelcome').innerHTML).toEqual('Welcome');
  });

  it('should translate home label in French', () => {
    translate.use('fr');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const title = fixture.nativeElement;
    expect(title.querySelector('#lblWelcome').innerHTML).toEqual('Bienvenue');
  });
});
