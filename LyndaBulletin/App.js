/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div>
				<div>
					<nav class="navbar fixed-top navbar-light bg-light">
					<a class="navbar-brand" href="#">Fixed top</a>
					</nav>
				</div>
				<Board/>
			</div>

		)
	}

}


class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			note: [],
			numNotes:0
		};

		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
		this.eachNote = this.eachNote.bind(this);
		this.add = this.add.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.changeColor = this.changeColor.bind(this);
	}
	componentWillMount () {
		//alert('Board loading');
	}
	componentDidMount () {
		//alert('Board loaded');
	}

	

	clearAll() {
		this.setState({
			note:[],
			numNotes: 0
		});
	}
	add () {
		//use time as the id as a hack for now
		//this will also serve as the default color picker
		var notesUpdated = this.state.note.concat([{id:(new Date).getTime(),color:'yellow'}]);
		console.log(this.state.note);
		
		this.setState({
			note:notesUpdated,
			numNotes: this.state.numNotes +=1,
		});
	} 
	changeColor (color, id) {
		console.log('changing to color: ' + color)
		var notesUpdated = this.state.note.map(
			note => (note.id !== id) ?
				note :
				{...note,
					color:color} 
			)
		this.setState({
			note:notesUpdated
		});
		console.log(this.state.note);
	}
	update (newText,id) {
		console.log(newText+ ' for '+id);
		var notesUpdated = this.state.note.map(
			note => (note.id !== id) ?
				note :
				{...note,
					note:newText} 
			)
		this.setState({
			note:notesUpdated
		});
		//console.log(notesUpdated);
		console.log(this.state.note);
	}
	remove (id) {
		var notesUpdated = this.state.note.filter((note) => (note.id !== id));
		this.setState({
			note:notesUpdated,
			numNotes: this.state.numNotes -=1
		});
	}

	eachNote(note){

		//console.log(note.id);
		//console.log(note.note);
		return (<Note 
						key={note.id}
						id={note.id}
						note={note.note}
						onChange={this.update}
						onRemove={this.remove}
						color={note.color}
						onColorChange={this.changeColor}
						>
						{/*note.note*/}
						</Note>);
	}

  render() {
    // change code below this line
		return (
			<div className=''>
				<div>
					<nav className="navbar fixed-top navbar-light bg-light">
						<a className="navbar-brand" >Bulletin Board</a>
							<div class="ml-auto">
								<button  className="btn btn-default mr-2"id='addBtn' onClick={this.add}><i class="fa fa-plus" aria-hidden="true"></i></button>
								<button className="btn btn-default" id='clearBtn' onClick={this.clearAll}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
							</div>
					</nav>
				</div>
				<div className="noteContainer">
					{this.state.note.map(this.eachNote)}
				</div>
			</div>
		);
  }
}




class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			textContent:this.props.note
		};
		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
		this.renderDisplay = this.renderDisplay.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.save = this.save.bind(this);
		this.randomBetween = this.randomBetween.bind(this);
		this.changeRed = this.changeRed.bind(this);
		this.changeGreen = this.changeGreen.bind(this);
		this.changeYellow = this.changeYellow.bind(this);

	}
	randomBetween() {
		var bodyWidth = document.body.clientWidth;
  	var bodyHeight = document.body.clientHeight;
  	console.log('body height is ' +bodyHeight);
  	var randPosX = Math.floor((Math.random()*bodyWidth));
  	var randPosY = Math.floor((Math.random()*bodyHeight));
  	console.log({'x':randPosX,'y':randPosY});
  	return {'x':randPosX,'y':randPosY};
	}
	
	componentWillMount () {
			this.setState({
				styleState:{
					left: this.randomBetween().x+'px',
          top: this.randomBetween().y+'px',
          backgroundColor: this.props.color 
				},
				
			})
	}
	
	componentDidUpdate() {
		if (this.state.editing){
			this.refs.newText.focus();
			this.refs.newText.select();
		}
	}

	edit () {
		this.setState ({
			editing:true,
			textContent:''
		});
	}
	remove() {
		//alert("Removing Note");
		this.props.onRemove(this.props.id);
	}
	save () {
		//var val = this.refs.newText.value;
		//alert(val);
		this.props.onChange(this.refs.newText.value, this.props.id);
		this.setState ({
			editing:false 
		});
		
		
	}
	changeRed () {
		this.setState ({
			styleState: {...this.state.styleState, backgroundColor:'red'}
		});
	}
	changeYellow () {
		this.setState ({
			styleState: {...this.state.styleState, backgroundColor:'yellow'}
		});
	}
	changeGreen () {
		this.setState ({
			styleState: {...this.state.styleState, backgroundColor:'green'}
		});
	}

	renderForm () {
		return(
		    <div className='card note' style={this.state.styleState}>
		    	<div className='card-body'>
		    		<textarea className='textInput' ref='newText'>{this.props.note}</textarea>
	    		</div>
		    	<div class="card-footer bg-transparent fixed-bottom">
		    		<div className="row">
			    		<div className="ml-auto">
								<button className='btn btn-success' onClick={this.save}><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
			    		</div>
		    		</div>
	    		</div>
    		</div>
		);

	}
	renderDisplay () {
    return (
		    <div className='card note' style={this.state.styleState}>
		    	<div className='card-body'>
			    	<p>{this.props.note}</p>
		    	</div>
		    	<div class="card-footer bg-transparent fixed-bottom">
		    		<div className="row">
			    		<button id="red" className="btn lblBtn" onClick={this.changeRed}></button>
			    		<button id="yellow" className="btn lblBtn"  onClick={this.changeYellow}></button>
			    		<button id="green" className="btn lblBtn" onClick={this.changeGreen}></button>
			    		<div className="ml-auto">
				    		<button className="btn btn-success" onClick={this.edit}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
				    		<button className="btn btn-danger" onClick={this.remove}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
			    		</div>
		    		</div>
	    		</div>
		    </div>

    );
	}
  render() {
		return (<ReactDraggable>{((this.state.editing) ? this.renderForm() : this.renderDisplay())}</ReactDraggable>);
  }
};

Note.defaultProps = {
	note: 'New Note'
}


ReactDOM.render(<App/>, document.getElementById('react-container'));