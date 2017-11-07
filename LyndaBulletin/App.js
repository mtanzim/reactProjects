

/*
import React, { PropTypes } from 'react';


Board.propTypes = {
	numNotes: PropTypes.number.isRequired
};
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


	clearAll() {
		this.setState({
			note:[],
			numNotes: 0
		});
	}
	add () {
		//use time as the id as a hack for now
		var notesUpdated = this.state.note.concat([{note:'New Note', id:(new Date).getTime()}]);
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
						onChange={this.update}
						onRemove={this.remove}>
						{note.note}
						</Note>);
	}

  render() {
    // change code below this line
		return (
			<div className='board'>
				<p>{this.state.numNotes}</p>
				<button onClick={this.add}>Add</button>
				<button onClick={this.clearAll}>Clear</button>
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
			textContent:this.props.note
		};
		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
		this.renderDisplay = this.renderDisplay.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.save = this.save.bind(this);

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
	renderForm () {
		return(
			<div className='note'>
				<textarea ref='newText'>{this.props.note}</textarea>
				<button onClick={this.save}>SAVE</button>
			</div>
		);

	}
	renderDisplay () {
    return (
	    <div className="note">
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
    // change code below this line
	return (this.state.editing) ? this.renderForm() : this.renderDisplay();
    // change code above this line
  }
};




ReactDOM.render(<Board/>, document.getElementById('react-container'));