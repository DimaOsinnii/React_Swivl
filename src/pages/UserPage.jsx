import {connect} from 'react-redux';
import React, {useEffect} from 'react'
import {getUser, setCurrentUser} from "../store/modules/users";
import {
    CircularProgress,
    Typography,
    Card,
    Button,
    CardMedia,
    CardContent,
    Box,
} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: '80vh'
    },

    loading: {
        position: "absolute",
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    media: {
        paddingTop: "56.25%",
        height: 0,
    },
    card: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 300,
        },
        minWidth: 500,
    }
}));

const UserPage = ({getCurrentUser, setUser, currentUser, match: {params}, history}) => {

    useEffect(() => {
        if (currentUser === null) {
            getCurrentUser(params.login);
        }
        return () => setUser(null)
    }, []);

    const style = useStyles();

    if (currentUser === null) {
        return (
            <div className={style.loading}>
                <CircularProgress disableShrink/>
            </div>
        )
    }
    const {
        name,
        followers,
        following,
        created_at,
        company,
        email,
        location,
        blog,
        bio,
        login,
        avatar_url
    } = currentUser;

    const date = new Date(created_at).toDateString();


    return (
        <div className={style.root}>
            <Typography variant="h4" gutterBottom>
                Github user - {login}
            </Typography>
            <Box mb={2}>
                <Card className={style.card} variant="outlined">
                    <CardMedia
                        image={avatar_url}
                        className={style.media}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name || '-'}
                        </Typography>
                        <Typography><b>Email: </b> {email || '-'}</Typography>
                        <Typography><b>Followers: </b> {followers}</Typography>
                        <Typography><b>Following: </b> {following}</Typography>
                        <Typography><b>Created at: </b> {date}</Typography>
                        <Typography><b>Company: </b> {company || '-'}</Typography>
                        <Typography><b>Location: </b> {location || '-'}</Typography>
                        <Typography><b>Blog: </b> {blog || '-'}</Typography>
                        <Typography><b>Bio: </b> {bio || '-'}</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Button
                variant="outlined"
                onClick={() => history.goBack()}
            >
                Back to the list
            </Button>
        </div>
    )
};

const mapStateToProps = ({gitHubUsers}) => {
    return {
        currentUser: gitHubUsers.currentUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: user => dispatch(setCurrentUser(user)),
        getCurrentUser: login => dispatch(getUser(login)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);