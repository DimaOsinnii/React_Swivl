import React from 'react';
import UsersList from "../pages/UsersList";
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import UserPage from "../pages/UserPage";
import {Container, CssBaseline} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        position: "relative",
        height: '100vh',
        paddingTop: 25
    },
});

export default function App() {
    const style = useStyles();
    return (
        <>
            <CssBaseline/>
            <Container className={style.root} fixed>
                <Switch>
                    <Route path='/users' component={UsersList}/>
                    <Route path='/user/:login' component={UserPage}/>
                    <Redirect to='/users'/>
                </Switch>
            </Container>
        </>
    )
}