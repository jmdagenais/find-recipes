import { StringUtils } from './shared/StringUtils';

export class Recipe {
  public _id: string;
  public name: string;
  public ingredients: string;
  public preparation: string;
  public tags: string[];
  public nbPortions: number = 1;
  public prepTime: number = 0;
  public cookTime: number = 0;
  public extraTime: number = 0;
  public extraTimeLabel: string = 'Temps extra';
  public imageUrl: string;
  public imageData: string;
  public tip: string;

  public get image(): string {
    return this.imageUrl || 'assets/images/assiette.jpg';
  }

  constructor(data?: any) {
    if (data) {
      this._id = data._id;
      this.name = data.name;
      this.ingredients = data.ingredients;
      this.preparation = data.preparation;
      this.tags = data.tags;
      this.nbPortions = data.nbPortions;
      this.prepTime = data.prepTime;
      this.cookTime = data.cookTime;
      this.extraTime = data.extraTime;
      this.extraTimeLabel = data.extraTimeLabel || 'Temps extra';
      this.imageUrl = data.imageUrl;
      this.imageData = data.imageData;
      this.tip = data.tip;
    }
  }

  // static sanitize(recipe: Recipe) {
  //   recipe.name = StringUtils.escapeString(recipe.name);
  //   recipe.ingredients = StringUtils.escapeString(recipe.ingredients);
  //   recipe.preparation = StringUtils.escapeString(recipe.preparation);
  //   recipe.tip = StringUtils.escapeString(recipe.tip);
  //   if (recipe.extraTime) {
  //     recipe.extraTime.name = StringUtils.escapeString(recipe.extraTime.name);
  //   }
  // }
}

// export interface Recipe {
//   id?: string;
//   name: string;
//   description: string;
//   tags: string[];
//   image?: string;
// }
