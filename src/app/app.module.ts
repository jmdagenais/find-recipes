import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmationService } from 'primeng/api';

import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { PrimeNgModule } from './primeNg.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HtmlifyPipe } from './shared/pipe/htmlify/htmlify.pipe';
import { TimeFormatPipe } from './shared/pipe/time-format/time-format.pipe';
import { RecipeService } from './shared/recipe.service';
import { TagSelectorComponent } from './tag-selector/tag-selector.component';

const routes: Route[] = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/add', component: AddRecipeComponent, canActivate: [AuthGuard] },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'recipes/:id/edit', component: AddRecipeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent }
];

const materialModules = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatChipsModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    RecipeListComponent,
    TagSelectorComponent,
    RecipeDetailComponent,
    AdminComponent,
    TimeFormatPipe,
    HtmlifyPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    PrimeNgModule,
    NgSelectModule,
    ...materialModules
  ],
  providers: [RecipeService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
