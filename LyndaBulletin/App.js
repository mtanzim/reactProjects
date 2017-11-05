
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: ['Hello Mom',
							'Hello Dad'
						]
		};
	}
  render() {
    // change code below this line
		return (
			<div className='board'>
				<Note/>
			</div>
		);
  }
}


class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
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
	}
	save () {
		//var val = this.refs.newText.value;
		//alert(val);
		this.setState ({
			editing:false,
			textContent:this.refs.newText.value
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




ReactDOM.render(<Board/>, document.getElementById('react-container'));