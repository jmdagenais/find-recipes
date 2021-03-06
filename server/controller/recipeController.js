const _ = require('lodash');
const image2base64 = require('image-to-base64');

function recipeController(Recipe){

  let listAllTags = (req, res) => {
    // let tags = ['Pates', 'Poulet', 'Poisson', 'Saumon', 'Crevettes', 'Boeuf', 'Porc', 'Dessert', 'Chocolat', 'Fruit'].sort();
    Recipe.find({}, 'tags', function(err, tags) {
      tags = _(tags).map((tag) => {
        return tag.tags;
      })
        .flatten()
        .uniq()
        .sort();

      res.json(tags);
    });
  };

  let getRecipes = (req, res) => {
    if(req.query.tags){
      console.log('request tags: ', req.query.tags);
      getRecipesByTag(req.query.tags, res)
    } else {
      getAllRecipes(res);
    }
  };

  function getRecipesByTag(tags, res){
    const response = res;
    return Recipe.find({tags: {$all:tags} })
      .then((recipes) => {
      console.log("success CB");
        res.json(recipes);
      })
      .catch((err) => {
      console.log("error CB");
          res.status(500);
          res.send(err);
      })
  }

  function getAllRecipes(res) {
    Recipe.find()
      .then((recipes) => {
        res.json(recipes);
      })
      .catch((err) => {
        res.status(500);
        res.send(err);
      })
  }

  let getRecipe = (req, res) => {
    Recipe.findById(req.params.id)
      .then(recipe => {
        res.json(recipe);
      })
      .catch((err) => {
        res.status(500);
        res.send(err);
      })
  };

  let createRecipe = (req, res) => {
    let newRecipe = new Recipe(req.body);
    saveRecipe(res, newRecipe);

    // image2base64(newRecipe.imageUrl)
    //   .then(response => {
    //     newRecipe.imageData = `data:image/png;base64,${response}`;
    //     saveRecipe(res, newRecipe);
    //   })
    //   .catch((err) => {
    //     console.log('image2base64 failed.');
    //     saveRecipe(res, newRecipe);
    //   });

  };

  let updateRecipe = async (req, res) => {
    try {
      let recipe = await Recipe.findById(req.params.id);
      // if image url has changed, delete imageData
      if(recipe.imageUrl !== req.body.imageUrl) {
        recipe.imageData = '';
      }
      recipe = Object.assign(recipe, req.body);
      await recipe.save();
      res.send(recipe);
    } catch (err) {
      console.log('Error in update: ', err);
      res.sendStatus(500);
    }
  };

  function saveRecipe(res, recipe) {
    recipe.save()
      .then((value) => {
        res.status(201);
        res.send(value);
      })
      .catch((err) => {
        res.status(500);
        res.send(err);
      })
  }

  deleteRecipe = async (req, res) => {
    try {
      // let recipe = await Recipe.findById(req.params.id);
      // recipe.delete()

      await Recipe.deleteOne({_id: req.params.id});
      res.sendStatus(204);
    } catch(err) {
      res.status(500);
      res.send(err);
    }
  };

  return {
    listAllTags,
    getRecipes,
    createRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe
  }
}

module.exports = recipeController;
