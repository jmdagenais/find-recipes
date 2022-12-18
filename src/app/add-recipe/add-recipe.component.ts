import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SubSink } from 'subsink';

import { environment } from '../../environments/environment';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit, OnDestroy {

  @ViewChild('f') recipeForm: NgForm;
  private tags: string[] = [];
  recipe: Recipe = new Recipe();
  extraTime: { time: number, name: string } = { time: 0, name: '' };
  showExtraTime = false;
  hasError = false;
  editMode = false;
  extraTimeLabelEditing = false;
  allTags: string[] = [];
  formGroup: FormGroup;

  private subs: SubSink = new SubSink();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const recipeId = this.route.snapshot.params['id'];
    if (recipeId) {
      this.editMode = true;
      this.subs.sink = this.recipeService.getRecipe(recipeId)
        .subscribe({
          next: (value: Recipe) => {
            this.recipe = value;
            if (this.recipe.extraTime > 0) {
              this.showExtraTime = true
            }
            this.hasError = false;
            this.buildFormGroup();
          }, error: (error) => {
            this.hasError = true;
          }
        });
    } else {
      this.buildFormGroup();
    }

    this.subs.sink = this.recipeService.getAllTags()
      .subscribe((tags: string[]) => {
        this.allTags = tags;
      });
  }

  buildFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.recipe.name),
      nbPortions: new FormControl(this.recipe.nbPortions),
      ingredients: new FormControl(this.recipe.ingredients),
      preparation: new FormControl(this.recipe.preparation),
      tags: new FormControl(this.recipe.tags),
      prepTime: new FormControl(this.recipe.prepTime),
      cookTime: new FormControl(this.recipe.cookTime),
      extraTime: new FormControl(this.recipe.extraTime),
      extraTimeLabel: new FormControl(this.recipe.extraTimeLabel),
      imageUrl: new FormControl(this.recipe.imageUrl),
    })
  }

  // addTag(tag: string) {
  //   if (tag.length > 0) {
  //     this.tags.push(tag);
  //     this.currentTag = '';
  //   }
  // }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  onExtraTimeLabelKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.extraTimeLabelEditing = false;
    }
  }

  submit() {
    if (this.formGroup.valid) {
      let observable: Observable<any>;

      // if (this.showExtraTime) {
      //   this.recipe.extraTime = this.extraTime;
      // }
      // save recipe to the DB
      if (this.editMode) {
        observable = this.recipeService.updateRecipe(this.recipe._id, this.formGroup.value);
      } else {
        observable = this.recipeService.createRecipe(new Recipe(this.formGroup.value));
      }

      this.subs.sink = observable
        .subscribe({
          next: (val) => {
            this.formGroup.reset();
            this.tags = [];
            this.done();
          },
          error: (err) => {
            this.hasError = true;
          }
        });
    }
  }

  done() {
    if (this.recipe._id) {
      this.router.navigate(['/recipes', this.recipe._id]);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
