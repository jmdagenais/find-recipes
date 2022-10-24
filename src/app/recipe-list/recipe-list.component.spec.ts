import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import {AutoCompleteModule} from 'primeng/primeng';
import {PrimeNgModule} from '../primeNg.module';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {RecipeService} from '../shared/recipe.service';
import {HttpClientModule} from '@angular/common/http';
import {TagSelectorComponent} from '../tag-selector/tag-selector.component';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimeNgModule, FormsModule, RouterTestingModule, HttpClientModule],
      providers: [RecipeService],
      declarations: [ RecipeListComponent, TagSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
