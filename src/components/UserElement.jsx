import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Avatar, ListItemAvatar, ListItemText, Button, ListItem, Divider} from '@material-ui/core';

export default function UserElement({user}) {
    const {html_url, login, avatar_url} = user;

    const handleClick = (event) => {
        event.preventDefault();
        window.open(html_url);
    }

    return (
        <>
            <ListItem
                button
                component={RouterLink}
                to={`/user/${login}`}
            >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={avatar_url}/>
                </ListItemAvatar>
                <ListItemText primary={login}/>
                <Button variant="outlined" onClick={handleClick}>
                    Profile link
                </Button>
            </ListItem>
            <Divider light/>
        </>
    )
};