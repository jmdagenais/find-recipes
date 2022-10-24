import { HttpClient } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Recipe } from '../recipe.model';
import { Api } from './api';
import { StringUtils } from './StringUtils';

@Injectable()
export class RecipeService {

  private tags: string[];
  private API_URL = environment.api_url;
  constructor(private api: Api) {

  }

  getAllTags(): Observable<string[]> {
    if (this.tags) {
      return of(this.tags);
    } else {
      return this.api.get('/tags')
        .pipe(tap((tags: string[]) => {
          this.tags = tags;
        }));
    }
  }

  getRecipes(tags: string[]): Observable<Recipe[]> {
    let url = '/recipes';
    let query = '';
    // Build the query string
    tags.forEach((t: string, index: number) => {
      if (index === 0) {
        query += 'tags=' + t;
      } else {
        query += '&tags=' + t;
      }
    });
    if (query.length > 0) {
      url = url + '?' + query;
    }

    return this.api.get(url)
      .pipe(map((recipes: Recipe[]) => {
        recipes.map(recipe => {
          return new Recipe(recipe);
        });
        return recipes;
      }));
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.api.get('/recipes/' + id)
      .pipe(map((recipe: Recipe) => {
        recipe.ingredients = StringUtils.removeHtmlEntities(recipe.ingredients);
        recipe.preparation = StringUtils.removeHtmlEntities(recipe.preparation);
        recipe.tip = StringUtils.removeHtmlEntities(recipe.tip);
        return new Recipe(recipe);
      }));
  }

  createRecipe(recipe: Recipe) {
    this.sanitizeRecipe(recipe);
    this.updateTags(recipe.tags);

    return this.api.post('/recipes', recipe);
  }

  updateRecipe(id: string, recipe: Recipe) {
    this.sanitizeRecipe(recipe);
    this.updateTags(recipe.tags);

    return this.api.put('/recipes/' + id, recipe);
  }

  deleteRecipe(id: string) {
    return this.api.delete('/recipes/' + id);
  }

  /**
   * update the cached list of tags
   * @param {string[]} tags
   */
  private updateTags(tags: string[]) {
    if (tags) {
      tags.forEach(tag => {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      });
    }
  }

  private sanitizeRecipe(recipe: Recipe) {
    recipe.name = StringUtils.escapeString(recipe.name);
    recipe.ingredients = StringUtils.escapeString(recipe.ingredients);
    recipe.preparation = StringUtils.escapeString(recipe.preparation);
    recipe.tip = StringUtils.escapeString(recipe.tip);
    recipe.extraTimeLabel = StringUtils.escapeString(recipe.extraTimeLabel);
  }
}
