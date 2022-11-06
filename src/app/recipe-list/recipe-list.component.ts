import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SubSink } from 'subsink';

import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  currentSearch: string;
  selectedTags: string[] = [];
  allTags: string[] = [];
  displayTags: string[] = [];
  recipes: Recipe[] = [];

  tagsSubscription: Subscription;
  recipeSubscription: Subscription;
  // formGroup: FormGroup;

  tagsControl: FormControl = new FormControl();

  private subs: SubSink = new SubSink();

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService) { }

  ngOnInit() {
    this.subs.sink = this.recipeService.getAllTags()
      .subscribe((tags: string[]) => {
        this.allTags = tags;
      });

    this.getRecipesByTag();

    this.tagsControl.valueChanges.subscribe((value) => {
      this.selectedTags = value;
      this.getRecipesByTag();
    })
  }

  onSearchTag(event) {
    if (event.query.length === 0) {
      this.displayTags = [];
      return;
    }
    this.displayTags = this.allTags.filter((tag: string) => {
      return tag.indexOf(event.query) === 0 && this.selectedTags.indexOf(tag) === -1;
    });
  }

  // selectTag(tag: string) {
  //   // check that the tag is not already selected
  //   const idx = this.selectedTags.indexOf(tag);
  //   if (idx === -1) {
  //     this.selectedTags.push(tag);
  //     this.getRecipesByTag();
  //     this.currentSearch = '';
  //     this.displayTags = [];
  //   }
  // }
  //
  // removeTag(tag: string) {
  //   const index = this.selectedTags.indexOf(tag);
  //   this.selectedTags.splice(index, 1);
  //   this.getRecipesByTag();
  // }

  getRecipesByTag() {
    this.subs.sink = this.recipeService.getRecipes(this.selectedTags)
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onSelectTag(tag: string) {
    const existingTags = this.tagsControl.value;
    if (!existingTags.includes(tag)) {
      this.tagsControl.setValue([...existingTags, tag]);
      this.getRecipesByTag();
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
