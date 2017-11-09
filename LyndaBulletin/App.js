/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/

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
			<div className='board'>
				{/*	<p>{this.state.numNotes}</p>*/}
				<button  className="btn btn-defautt"id='addBtn' onClick={this.add}>+</button>
				<button className="btn btn-default" id='clearBtn' onClick={this.clearAll}>Clear</button>
				{this.state.note.map(this.eachNote)}
			</div>
		);
  }
}




class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			textContent:this.props.note,
			styleState: {backgroundColor:this.props.color}
		};
		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
		this.renderDisplay = this.renderDisplay.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.save = this.save.bind(this);
		this.randomBetween = this.randomBetween.bind(this);

	}
	randomBetween() {
		var bodyWidth = document.body.clientWidth;
  	var bodyHeight = document.body.clientHeight;
  	var randPosX = Math.floor((Math.random()*bodyWidth));
  	var randPosY = Math.floor((Math.random()*bodyHeight));
  	console.log({'x':randPosX,'y':randPosY});
  	return {'x':randPosX,'y':randPosY};
	}
	
	componentWillMount () {
			this.setState({
				styleState:{
					backgroundColor:this.props.color,
					left: this.randomBetween().x+'px',
          bottom: this.randomBetween().y+'px' 
				}
			})
	}
	
	componentWillUpdate () {
		if (this.state.editing===false){

		}

	}
	componentDidUpdate() {
		if (this.state.editing){
			this.refs.newText.focus();
			this.refs.newText.select();
		}
	}
	/*
	shouldComponentUpdate (nextProps, nextState) {
		if (this.state.editing){
			return this.props.note !== nextProps.note || this.state.textContent !== nextState.textContent;
		} else { return true;}
	}
	*/

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
	renderForm () {
		return(
			<div className='note' style={this.state.styleState} >
				<textarea ref='newText'>{this.props.note}</textarea>
				<button className='btn btn-success' onClick={this.save}>SAVE</button>
			</div>
		);

	}
	renderDisplay () {
    return (
	    <div className='note' style={this.state.styleState}>
	    	{/*<p>{this.props.id}</p>*/}
	    	<p>{this.props.note}</p>
	    	<span>
	    		<button id="red" className="btn lblBtn">R</button>
	    		<button id="yellow" className="btn lblBtn">G</button>
	    		<button id="green" className="btn lblBtn">B</button>
	    		<button className="btn btn-success" onClick={this.edit}>EDIT</button>
	    		<button className="btn btn-danger" onClick={this.remove}>X</button>
    		</span>
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


ReactDOM.render(<Board/>, document.getElementById('react-container'));