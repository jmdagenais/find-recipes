// import {Injectable, SecurityContext} from '@angular/core';
// import {Observable} from 'rxjs/index';
// import { of } from 'rxjs';
// import {HttpClient} from '@angular/common/http';
// import {environment} from '../../environments/environment';
// import {map, tap} from 'rxjs/internal/operators';
// import {Recipe} from '../recipe.model';
// import {DomSanitizer} from '@angular/platform-browser';
// import {StringUtils} from './StringUtils';

// @Injectable()
// export class RecipeServiceNode {

//   private tags: string[];
//   private API_URL = environment.api_url;
//   constructor(private http: HttpClient,
//     private sanitizer: DomSanitizer) {

//   }

//   getAllTags(): Observable<string[]> {
//     // const tags = ['poulet', 'poisson', 'pâtes', 'dessert', 'chocolat', 'boeuf', 'végétarien'];
//     if (this.tags) {
//       return of(this.tags);
//     } else {
//       return this.http.get(this.API_URL + '/tags')
//         .pipe(tap((tags: string[]) => {
//           this.tags = tags;
//         }));
//     }
//   }

//   getRecipes(tags: string[]): Observable<Recipe[]> {
//     let url = '/recipes';
//     let query = '';
//     // Build the query string
//     tags.forEach((t: string, index: number) => {
//       if (index === 0) {
//         query += 'tags=' + t;
//       } else {
//         query += '&tags=' + t;
//       }
//     });
//     if (query.length > 0) {
//       url = url + '?' + query;
//     }

//     return this.http.get(this.API_URL + url)
//       .pipe(map((recipes: Recipe[]) => {
//         recipes.map(recipe => {
//           return new Recipe(recipe);
//         });
//         return recipes;
//       }));
//   }

//   getRecipe(id: string): Observable<Recipe> {
//     return this.http.get(this.API_URL + '/recipes/' + id)
//       .pipe(map((recipe: Recipe) => {
//         recipe.ingredients = StringUtils.removeHtmlEntities(recipe.ingredients);
//         recipe.preparation = StringUtils.removeHtmlEntities(recipe.preparation);
//         recipe.tip = StringUtils.removeHtmlEntities(recipe.tip);
//         return new Recipe(recipe);
//       }));
//   }

//   createRecipe(recipe: Recipe) {
//     // sanitize the values before saving
//     recipe.name = this.sanitizer.sanitize(SecurityContext.HTML, recipe.name);
//     recipe.ingredients = this.sanitizer.sanitize(SecurityContext.HTML, recipe.ingredients);
//     recipe.preparation = this.sanitizer.sanitize(SecurityContext.HTML, recipe.preparation);
//     recipe.tip = this.sanitizer.sanitize(SecurityContext.HTML, recipe.tip);
//     if (recipe.extraTime) {
//       recipe.extraTime.name = this.sanitizer.sanitize(SecurityContext.HTML, recipe.extraTime.name);
//     }

//     // save recipe to the DB
//     return this.http.post(this.API_URL + '/recipes', recipe);
//   }

//   updateRecipe(id: string, recipe: Recipe) {
//     return this.http.put(this.API_URL + '/recipes/' + id, recipe);
//   }

//   deleteRecipe(id: string) {
//     return this.http.delete(this.API_URL + '/recipes/' + id);
//   }
// }
