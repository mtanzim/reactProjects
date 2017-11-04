
/*
class SubApp extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    // change code below this line
    return (
	    <div>
	    	<h1>{this.props.text}</h1>
	    </div>
    );
    // change code above this line
  }
};

*/
class App extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    // change code below this line
    return (
	    <div>
	    	<Note/>
	    </div>
    );
    // change code above this line
  }
};


class Note extends React.Component {
	constructor(props) {
		super(props);
	}

	edit () {
		alert("Editing Note");
	}
	remove() {
		alert("Removing Note");
	}
  render() {
    // change code below this line
    return (
	    <div className="note">
	    	<p/>
	    	<span>
	    		<button onClick={this.edit}>EDIT</button>
	    		<button onClick={this.remove}>X</button>
    		</span>
	    </div>
    );
    // change code above this line
  }
};




ReactDOM.render(<App/>, document.getElementById('react-container'));