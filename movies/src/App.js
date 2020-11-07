import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MovieTitle from './Components/MovieTitle';
import MovieContent from './Components/MovieContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from './Theme';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
  divLayout: {
    display: 'flex',
    border: '2px solid',
  },
  title: {
    padding: 20
  }
}));
const MOVIES_URL = 'http://starlord.hackerearth.com/movies';

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [id, setID] = useState('');
  const [error, setErrorValue] = useState('');
  useEffect(() => {
    if (id === '') {
      fetch(MOVIES_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => data.json())
        .then((data) => {
          console.log(data);
          const newData = data.map((detail, index) => {
            return { ...detail, id: index };
          });
          setData(newData);
        })
        .catch(error => setErrorValue(error));
    } else {
      const mID = document.getElementById(`m_${id}`);
      const cID = document.getElementById(`c_${id}`);
      mID.scrollIntoView();
      cID.scrollIntoView();
    }
  }, [id]);

  const movieTitle = () => <MovieTitle data={data} setID={setID} />;

  const movieContent = () => <MovieContent data={data} setID={setID} />;

  const divLayout = () => {
    return (
      <div className={classes.divLayout} id="layout">
        {movieTitle()}
        {movieContent()}
      </div>
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        {error
          ? <><Typography variant="h1">Some Error Occured!</Typography></>
          : data.length
            ? divLayout()
            : <CircularProgress />}
      </div>
    </ThemeProvider>
  );
}

export default App;