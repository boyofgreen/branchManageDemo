import Autosuggest from 'react-autosuggest'     // This component provides accessible autosuggest functionality
import React from 'react'                       // General React support
import {Link} from 'react-router-dom'             // Need this to support main app container Links

// Sample branch search data
const BranchSearch = [
  {name: "branch 1", buildNumber: "15043", id:1}, {name: "branch 2", buildNumber: "15044", id:2},
  {name: "branch 3", buildNumber: "15045", id:3}, {name: "branch 4", buildNumber: "15046", id:4},
  {name: "branch 5", buildNumber: "15047", id:5}, {name: "branch 6", buildNumber: "15048", id:6},
  {name: "branch 7", buildNumber: "15049", id:7}, {name: "branch 8", buildNumber: "15050", id:8},
  {name: "branch 9", buildNumber: "15051", id:9}, {name: "branch 10", buildNumber: "15052", id:10},
  {name: "branch 11", buildNumber: "15053", id:11}, {name: "branch 12", buildNumber: "15054", id:12}
];

// Teach Autosuggest how to calculate suggestions for any given input value
const getSuggestions = value => {
    // References the value of the search input box
    const inputValue = value.trim().toLowerCase();
    // Stores the length of the current input value
    const inputLength = inputValue.length;
    // Returns the matches from the BranchSearch JSON object
    return inputLength === 0 ? [] : BranchSearch.filter(build => build.buildNumber.toLowerCase().slice(0, inputLength) === inputValue);
}

// When suggestion is clicked, populate the input field
const getSuggestionValue = suggestion => suggestion.buildNumber;

const renderSuggestion = suggestion => (
  <div>
    <div>
    <h3>RSMAIN</h3>
    <p>{suggestion.buildNumber}</p>
    <h4>Active Branch Count: 3</h4>
    <ul className="branchInfo">
      <li><h5>Execution Status:</h5> FAILED</li>
      <li><h5>Branch Debt:</h5> 0</li>
      <li><h5>Bugs:</h5> 29</li>
      <li><h5>SelfHost:</h5> 203/200</li>
    </ul>
        <Link to={`/home`} >
          Pin Branch to Home
        </Link>
  </div>
  </div>
);

// Controlling the theme of the searchBox control
const theme = {
  container: {
    position: 'relative'
  },
  input: {
    width: 240,
    height: 30,
    padding: '10px 20px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    border: '1px solid #aaa',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 51,
    width: "90%",
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
}

// Using AutoSuggest Search Component
export default class BuildSearch extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'enter branch search term',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
      />
    );
  }
}