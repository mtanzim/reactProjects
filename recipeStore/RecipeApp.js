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

	eachRecipe(recipe){
		return (
			<RecipeCard
				key={recipe.id}
				id={recipe.id}
				title={recipe.title}
				ingredients={recipe.ing}
				addIng={this.addIngredient}
			></RecipeCard>
		);
	}

	render () {
		return (
			<div className="container">
				<h1>Recipe List</h1>
				<div className="row">
					{this.state.recipes.map(this.eachRecipe)}
				</div>
				<button className="btn btn-default">Add Recipe</button>
			</div>
		)
	}
}


class RecipeCard extends React.Component {
	constructor(props) {
		super(props);
		this.eachIng = this.eachIng.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
	}
	eachIng(ing){
		return (
			<Ingredient ing={ing} key={ing.id}/>
		);
	}

	addIngredient () {
		this.props.addIng(this.props.id);
	}

	render () {
		//console.log(Object.keys(this.props.ingredients[0]));
		return (
			<div className='col-12 col-sm-6'>
				<div className="card">
					<h3 className="card-header">{this.props.title}</h3>
				 	<div className="card-body">
			 			<table>
			 				<thead>
				 				<tr>
				 					<th>Name</th>
				 					<th></th>
				 					<th>Qty</th>
				 					<th></th>
				 					<th>Units</th>
				 					<th></th>
			 					</tr>
		 					</thead>
		 					<tbody>
				 				{this.props.ingredients.map(this.eachIng)}
			 				</tbody>
		 				</table>
		 				<button className="btn" onClick={this.addIngredient}>Add Ingredient</button>
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
				<td><button className="btn">Edit</button></td>
				<td>{this.props.ing.qty}</td>
				<td><button className="btn">Edit</button></td>
				<td>{this.props.ing.unit}</td>
				<td><button className="btn">Edit</button></td>
			</tr>

		);
	}
}


ReactDOM.render(<RecipeApp/>, document.getElementById('react-container'));