import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getData,} from "../store/modules/users";
import UserElement from "../components/UserElement";
import LoadingButton from '@material-ui/lab/LoadingButton';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Typography, List} from "@material-ui/core";

const useStyles = makeStyles({
    head: {
        display: "flex",
        alignItems: "center"
    },
    heading: {
        marginRight: 20
    },
    btn: {
        display: "flex",
        justifyContent: "center"
    },
    list: {
        borderColor: 'rgba(0, 0, 0, 0.08)',
        m: 1,
        border: 1,
        borderRadius: 16,
        borderStyle: "solid",
        overflow: "hidden"
    }
});


const UserList = ({getData, count, users, loading}) => {
    useEffect(() => {
        if (users.length === 0) {
            getData(count);
        }
    }, []);

    const style = useStyles();

    return (
        <>
            <div className={style.head}>
                <Typography
                    className={style.heading}
                    variant="h4"
                    gutterBottom
                    component="div"
                >
                    List of GitHub users
                </Typography>
                <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                >
                    ({users.length})
                </Typography>
            </div>
            <List disablePadding className={style.list}>
                {users.map((user) => (
                    <UserElement key={user.id} user={user}/>
                ))}
            </List>
            <Box className={style.btn} m={1} p={1}>
                <LoadingButton
                    onClick={() => getData(count)}
                    pending={loading}
                    pendingIndicator="Loading..."
                    variant="outlined"
                >
                    load more
                </LoadingButton>
            </Box>
        </>
    )
}

const mapStateToProps = ({gitHubUsers}) => ({
    count: gitHubUsers.count,
    users: gitHubUsers.users,
    loading: gitHubUsers.loading
})

export default connect(mapStateToProps, {getData})(UserList)