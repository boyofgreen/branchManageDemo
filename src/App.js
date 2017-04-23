import React from 'react'
import './App.css';
import BuildSearch from './BuildSearch.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


// Render a home pin
const HomePin = (props) =>(
    <div>
      <h2>Branches you are watching:</h2>
      <ul className="branchWatch">
      <li>showing a pin</li>
      </ul>
    </div>
)


class Home extends React.Component {
    // Home consturctor
    constructor(props) {
        super(props);
        this.state = {showPin: false};
    }
  
    // Show the pinned build
    showPin(){
        this.setState({showPin: true})
    }
  
    // Render the HTML view for the Home component
    render() {
        // If not showing a Pin
        if(this.state.showPin === false){
            return  (
              <div>
                
                <h2>Branches you are watching:</h2>
                
                <ul className="branchWatch">
                    
                    <li className="empty">
                        <p>you have no branches tracking</p>
                        <Link to={`/search`}>
                            watch a branch
                            </Link>
                    </li> 
                </ul>
              </div>
            )
        }
        // Otherwise show pin
        else{
          return (
            <div>
              <li>showing a pin</li>
            </div>
          )

    }
}
  }

/*const SearchResults = () => (
  <li>
    <h2>Branch Name:</h2>
    <p>content of branch</p>
  </li>
)*/

// Sample branch search data
const BranchSearch = [
  {name: "branch 1", id:1}, {name: "branch 2", id:2},
  {name: "branch 3", id:3}, {name: "branch 4", id:4},
  {name: "branch 5", id:5}, {name: "branch 6", id:6},
  {name: "branch 7", id:7}, {name: "branch 8", id:8},
  {name: "branch 9", id:9}, {name: "branch 10", id:10},
  {name: "branch 11", id:11}, {name: "branch 12", id:12}
];

// Component: Search results - Render search results
const SearchResults = () => (
  <ul className="searchResults">
    {BranchSearch.map(i => (
      <li  key={i.id}>
        <div className="chartIcon" style={{backgroundImage: 'url(/images/chart.png)'}}></div>
        <p>{i.name}</p>
        <Link to='/details'>details</Link>
      </li>
    ))}
  </ul>
)

// Component: Search Details
const Details = () =>{
 // Home.showPin()
  return (
  <div>
    <h3>RSMAIN</h3>
    <p>16188.0.23433212-11</p>
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
)
}

// Component: Search
const Search = ({ match }) => (
  <div className="searchStart">
    <h2>Search for Branch to Watch:</h2>
    <div className="searchBox">
            <input placeholder="enter branch search term" type="text"></input>
            <Link to={`${match.url}/results`} className="myButton">
                search
            </Link>
      </div>
    <div id="searchResults">
      <Route path={`${match.url}/:topicId`} component={SearchResults}/>
    </div>
  </div>
)



// Common header and routing logic
// **ADDED BuildSearch Component from https://github.com/moroshko/react-autosuggest  **
// **To use original search replace /search route below with just Search**
const BuildManager = () => (
  <Router>
    <div>
      <ul className="header">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>


      <div className="buildApp">
        <Route exact path="/" component={Home} showPin="false" />
        <Route path="/search" component={BuildSearch}/>
        <Route path="/details" component={Details}/>
        <Route path="/home" component={HomePin}/>
      </div>
    </div>
  </Router>
)

// export the build manager Component
export default BuildManager