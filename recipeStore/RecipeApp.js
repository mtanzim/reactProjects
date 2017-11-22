/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/

class RecipeApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [{id:1,
									title:'Coffee', 
									ing:[{id:100,name:'Sugar', qty:2, unit: 'tbsp'}]
								},
								{id:2,
									title:'Oolong Tea', 
									ing:[{id:101,name:'Sugar', qty:2, unit: 'tbsp'}, {id:102, name:'Salt', qty:2, unit: 'tbsp'} ]
								}],
			numRecipes:2
		};

		this.eachRecipe = this.eachRecipe.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.delAllIngredient = this.delAllIngredient.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.remRecipe = this.remRecipe.bind(this);
		this.removeAll = this.removeAll.bind(this);

	}

	addRecipe() {
		var updatedRecipe = this.state.recipes.concat([{id:(new Date).getTime(), title:'Chai Latte', ing:[{}]}])
		this.setState({
			recipes:updatedRecipe,
			numRecipes: this.state.numRecipes+1
		});
	}

	remRecipe(id) {
		var indexToDel=-1;
		this.state.recipes.forEach(function(recipe, index){
			if (recipe.id===id){
				indexToDel=index;
			}
		});

		console.log(`index to del is ${indexToDel}`);

		var recipeUpdated = this.state.recipes;
		this.state.recipes.splice(indexToDel,1);
		
		this.setState({
			recipes:recipeUpdated
		});

		console.log(recipeUpdated);
	}

	removeAll(){
		this.setState({
			recipes:[],
			numRecipes:0
		});
	} 

	addIngredient(id) {
		var newIng = [{id:(new Date).getTime(), name: 'milk', qty: 2, unit: 'ml'}];
		console.log();
		var recipeUpdated = this.state.recipes.map(function(recipe){
			if (recipe.id===id){
				var addedIng=recipe.ing.concat(newIng);
				return {...recipe,ing:addedIng};
			} else {
				return recipe;
			}
		});

		this.setState({
			recipes:recipeUpdated
		});

		console.log(recipeUpdated);


	}
	delAllIngredient(id) {
		var recipeUpdated = this.state.recipes.map(function(recipe){
			if (recipe.id===id){
				var emptyArr=[];
				return {...recipe,ing:emptyArr};
			} else {
				return recipe;
			}
		});

		this.setState({
			recipes:recipeUpdated
		});

		console.log(recipeUpdated);


	}

	eachRecipe(recipe){
		return (
			<RecipeCard
				key={recipe.id}
				id={recipe.id}
				title={recipe.title}
				ingredients={recipe.ing}
				addIng={this.addIngredient}
				remRecipe={this.remRecipe}
				delAllIng={this.delAllIngredient}
			></RecipeCard>
		);
	}

	render () {
		return (
			<div className="container">
				<h1>Recipe List</h1>
				<button className="btn btn-default" onClick={this.addRecipe}>Add Recipe</button>
				<button className="btn btn-danger" onClick={this.removeAll}>Delete All</button>
				<div className="row">
					{this.state.recipes.map(this.eachRecipe)}
				</div>
				
			</div>
		)
	}
}


class RecipeCard extends React.Component {
	constructor(props) {
		super(props);
		this.eachIng = this.eachIng.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.removeRecipe = this.removeRecipe.bind(this);
		this.delAllIngredient = this.delAllIngredient.bind(this);
	}
	eachIng(ing){
		if (Object.keys(ing).length !== 0){
			return (
				<Ingredient ing={ing} key={ing.id}/>
			);
		}
		
	}

	removeRecipe(){
		this.props.remRecipe(this.props.id);
	}

	addIngredient () {
		this.props.addIng(this.props.id);
	}
	delAllIngredient () {
		this.props.delAllIng(this.props.id);
	}

	render () {
		//console.log(Object.keys(this.props.ingredients[0]));
		return (
			<div className='col-12 col-sm-6'>
				<div className="card">
					<h3 className="card-header">{this.props.title}</h3>
					<button className="btn btn-default" >Edit</button>
					<button className="btn btn-danger" onClick={this.removeRecipe}>Remove</button>	
				 	<div className="card-body">
				 		<button className="btn" onClick={this.addIngredient}>Add Ingredient</button>
		 				<button className="btn btn-danger" onClick={this.delAllIngredient}>Remove All</button>
			 			<table>
			 				<thead>
				 				<tr>
				 					<th>Name</th>
				 					<th>Qty</th>
				 					<th>Units</th>
				 					<th>Action</th>
				 					<th>Remove</th>
			 					</tr>	
		 					</thead>
		 					<tbody>
				 				{this.props.ingredients.map(this.eachIng)}
			 				</tbody>
		 				</table>

				 	</div>
				 </div>
			 </div>
		);
	}
}

class Ingredient extends React.Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<tr>
				<td>{this.props.ing.name}</td>
				<td>{this.props.ing.qty}</td>
				<td>{this.props.ing.unit}</td>
				<td><button className="btn">Edit</button></td>
				<td><button className="btn btn-danger">Remove</button></td>
			</tr>

		);
	}
}


ReactDOM.render(<RecipeApp/>, document.getElementById('react-container'));