import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable, take } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../shared/recipe.service';
import { StringUtils } from '../shared/StringUtils';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  ingredients: SafeHtml;
  preparation: SafeHtml;
  constructor(private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.recipeService.getRecipe(params['id'])
          .subscribe(recipe => {
            this.recipe = recipe;
          });
      });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe._id)
      .pipe(take(1))
      .subscribe((value) => {
        this.router.navigate(['/']);
      });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette recette?',
      accept: () => {
        this.deleteRecipe();
      }
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }



}
