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
									ing:[{name:'Sugar', qty:2, unit: 'tbsp'}]
								},
								{id:2,
									title:'Tea', 
									ing:[{name:'Sugar', qty:2, unit: 'tbsp'}, {name:'Salt', qty:2, unit: 'tbsp'} ]
								}],
			numRecipes:1
		};

		this.eachRecipe = this.eachRecipe.bind(this);

	}

	eachRecipe(recipe){
		return (
			<RecipeCard
				key={recipe.id}
				id={recipe.id}
				title={recipe.title}
				ingredients={recipe.ing}
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
		//this.eachIngKey = this.eachIngKey.bind(this);
	}
	eachIng(ing){
		return (
			<tr>
				<td>{ing.name}</td>
				<td><button className="btn">Edit</button></td>
				<td>{ing.qty}</td>
				<td><button className="btn">Edit</button></td>
				<td>{ing.unit}</td>
				<td><button className="btn">Edit</button></td>
			</tr>
		);
	}
	/*
	eachIngKey(ing) {
		console.log(ing);
		return (
				<span>
					<th>{ing}</th>
				</span>
		);
	}
	*/
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
		 				<button className="btn">Add Ingredient</button>
				 	</div>
				 </div>
			 </div>
		);
	}
}


ReactDOM.render(<RecipeApp/>, document.getElementById('react-container'));