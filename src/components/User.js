import { getUser } from "../services/HNService";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TimeAgo from "react-timeago";

export default function User() {
  const [user, setUser] = useState({});

  const { userID } = useParams();

  useEffect(() => {
    getUser(userID).then((data) => data && data.id && setUser(data));
  }, [userID]);

  let userDate = new Date(user.created * 1000);

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ fontWeight: "Bold", fontSize: "h6.fontSize" }}
      >
        {user.id}
      </Typography>
      <Box>
        <Typography variant="body1">
          Created: <TimeAgo date={userDate}></TimeAgo> (
          {userDate.toDateString()})
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1">Karma: {user.karma} points</Typography>
      </Box>
      {user.about ? (
        <Box>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: user.about }}
          ></Typography>
        </Box>
      ) : null}
    </Box>
  );
}
