import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setUsers(json))
      .catch(error => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false))
    }

    if (isLoading) {
      fetchData();
    }
  }, [isLoading])

  const handleClick = () => setIsLoading(true);

  return (
    <div className="App">
      <header className="App-header">
        {!hasError ?
          (<Button color="primary" onClick={handleClick} disabled={isLoading}>
            {isLoading ? 'loading' : 'get users'}
          </Button>) : null}
        {
          users.map(user => (
            <ListGroup>
              <ListGroupItem>{user.name}</ListGroupItem>
            </ListGroup>
          ))
        }
      </header>
    </div>
  );
}

export default App;
