import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, GridList } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    card: {
		border: "1px solid black"
	},
}));

function MovieContent(props) {
    const classes = useStyles();

    const handleClick = (id, e) => {
        e.preventDefault();
        props.setID(id);
    }
    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={1} spacing={3}>
                {props.data.map((data) => (
                        <Card id={`c_${data.id}`} className={classes.card} key={data.id} onClick={(e) => handleClick(data.id, e)}>
                            <CardContent>
                                <Typography variant="h3">{data.id}</Typography>
                                <Typography variant="h3">{data.actor_1_name}</Typography>
                                <Typography variant="h3">{data.title_year}</Typography>
                            </CardContent>
                        </Card>
                ))}
            </GridList>
        </div>
    );
}

export default MovieContent;
