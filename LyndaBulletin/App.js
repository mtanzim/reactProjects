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
		var notesUpdated = this.state.note.concat([{id:(new Date).getTime()}]);
		console.log(this.state.note);
		
		this.setState({
			note:notesUpdated,
			numNotes: this.state.numNotes +=1,
		});
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
						noteStyle={{backgroundColor:'yellow'}}
						onChange={this.update}
						onRemove={this.remove}
						onClick={this.changeColor}
						>
						{/*note.note*/}
						</Note>);
	}

  render() {
    // change code below this line
		return (
			<div className='board'>
				{/*	<p>{this.state.numNotes}</p>*/}
				<button id='addBtn' onClick={this.add}>+</button>
				<button id='clearBtn' onClick={this.clearAll}>Clear</button>
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
			styleState: this.props.noteStyle
		};
		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
		this.renderDisplay = this.renderDisplay.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.save = this.save.bind(this);
		this.changeColor = this.changeColor.bind(this);
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
					backgroundColor:'yellow',
					left: this.randomBetween().x+'px',
          bottom: this.randomBetween().y+'px' 
				}
			})
	}
	
	componentWillUpdate () {
		//console.log ('changing colors');
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
	changeColor () {

		this.state.styleState.backgroundColor === 'purple' ? 
			this.setState({
				styleState:{backgroundColor:'blue'}
			}) :
			this.setState({
				styleState:{backgroundColor:'purple'}
			}) 
	}
	renderForm () {
		return(
			<div className='note' style={this.state.styleState} >
				<textarea ref='newText'>{this.props.note}</textarea>
				<button onClick={this.save}>SAVE</button>
			</div>
		);

	}
	renderDisplay () {
    return (
	    <div className='note' style={this.state.styleState}>
	    	{/*<p>{this.props.id}</p>*/}
	    	<p>{this.props.note}</p>
	    	<span>
	    		<button onClick={this.edit}>EDIT</button>
	    		<button onClick={this.remove}>X</button>
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