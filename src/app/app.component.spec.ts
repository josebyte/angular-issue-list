import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {BrowserModule, By} from "@angular/platform-browser";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        NgbPaginationModule,
        BrowserModule,
        HttpClientModule
      ],
    }).compileComponents().then(() =>{
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    });
  }));

    it(`should have a default empty input'`, () => {
        expect(comp.repoUrl).toEqual("");
    });

    it(`should check if is a github valid url'`, () => {
        let inputElement = fixture.debugElement.query(By.css('input[name="repoUrl"]'));
        inputElement.nativeElement.value = 'https://not-valid-github-repo-url.com/bad';

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const errorDiv = fixture.debugElement.query(By.css('.alert-danger')).nativeElement;
            expect(errorDiv.innerHTML).toEqual('Url is not a github valid repository.');
        });

    });
});
