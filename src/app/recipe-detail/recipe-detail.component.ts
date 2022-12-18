import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  @ViewChild('confirmDeleteDialog') confirmDeleteDialog: any;

  constructor(private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog) { }

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
    const dialog: MatDialogRef<boolean> = this.matDialog.open(this.confirmDeleteDialog);

    dialog.afterClosed().subscribe(value => {
      if (value) {
        this.deleteRecipe();
      }
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }



}
