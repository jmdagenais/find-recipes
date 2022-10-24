import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailComponent } from './recipe-detail.component';
import {PrimeNgModule} from '../primeNg.module';
import {TimeFormatPipe} from '../shared/pipe/time-format/time-format.pipe';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {RecipeService} from '../shared/recipe.service';
import {HtmlifyPipe} from '../shared/pipe/htmlify/htmlify.pipe';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimeNgModule, FormsModule, RouterTestingModule, HttpClientModule],
      providers: [RecipeService],
      declarations: [ RecipeDetailComponent,
      TimeFormatPipe,
      HtmlifyPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
