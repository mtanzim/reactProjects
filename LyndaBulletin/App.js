

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
			note: [
	      {id: 0, note: 'Call Bob'},
	      {id: 1, note: 'Email Sarah'},
	      {id: 2, note: 'Eat Lunch'},
	      {id: 3, note: 'Finish proposal'}
      ]
		};
	}
	update (newText, id	) {
		var notesUpdated = this.state.note.map(
			note => (note.id !== id) ?
				note :
				{...note,note:newText} 
			)
		this.setState({notesUpdated});
	}
	remove (id) {
		var notesUpdated = this.state.note.filter((note) => (note.id !== id));
		this.setState({notesUpdated});
	}

  render() {
    // change code below this line
		return (
			<div className='board'>
				{this.state.note.map( (notes) => {
					return <Note key={notes.id}
											 note={notes.note}
											 onChange={this.update}
											 onRemove={this.remove}
								  ></Note>
				})}
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
		alert("Removing Note");
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
				<textarea ref='newText'></textarea>
				<button onClick={this.save}>SAVE</button>
			</div>
		);

	}
	renderDisplay () {
    return (
	    <div className="note">
	    	<p>{this.state.textContent}</p>
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




ReactDOM.render(<Board numNotes={100}/>, document.getElementById('react-container'));