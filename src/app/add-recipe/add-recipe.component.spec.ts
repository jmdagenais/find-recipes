import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeComponent } from './add-recipe.component';
import {PrimeNgModule} from '../primeNg.module';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {RecipeService} from '../shared/recipe.service';
import {HttpClientModule} from '@angular/common/http';
import {TagSelectorComponent} from '../tag-selector/tag-selector.component';

describe('AddRecipeComponent', () => {
  let component: AddRecipeComponent;
  let fixture: ComponentFixture<AddRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrimeNgModule, FormsModule, RouterTestingModule, HttpClientModule],
      providers: [RecipeService],
      declarations: [ AddRecipeComponent, TagSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
