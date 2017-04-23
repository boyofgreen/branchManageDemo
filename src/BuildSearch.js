import Autosuggest from 'react-autosuggest';
import React from 'react'

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
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength == 0 ? [] : BranchSearch.filter(build => build.buildNumber.toLowerCase().slice(0, inputLength) === inputValue);
}

// When suggestion is clicked, populate the input field
const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name} {suggestion.buildNumber}
  </div>
);

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
      />
    );
  }
}