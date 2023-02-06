import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    console.log('constructor');
    super();

    this.state = {
      monsters: [],
      searchString: '',
    };
  }

  componentDidMount() {
    console.log('componentedidmount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onChangeSearch = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchString };
    });
  };

  render() {
    const { monsters, searchString } = this.state;
    const { onChangeSearch } = this;

    const searchRes = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchString);
    });

    return (
      <div className="App">
        <input
          type="search"
          className="search-box"
          placeholder="search monsters"
          onChange={onChangeSearch}
        />
        {searchRes.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
