import { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import { getCommentParent, getItem } from "../services/HNService";
import { Box, Typography, Divider, Stack } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

export default function Comment({ commentID, level }) {
  const [comment, setComment] = useState({});
  //const [parentStory, setParentStory] = useState({});

  useEffect(() => {
    getItem(commentID).then((data) => data && data.id && setComment(data));
    // getCommentParent(commentID).then(
    //   (data) => data && data.id && setParentStory(data)
    // );
  }, [commentID]);

  const getCommentHeader = () => {
    return (
      <Typography variant="body2">
        <LinkRouter to={`/user/${comment.by}`} className="link bold">
          {comment.by}
        </LinkRouter>{" "}
        <TimeAgo date={comment.time * 1000}></TimeAgo>
        {/* |{" "}
        {comment.parent ? (
          <>
            <LinkRouter to={`/comment/${comment.parent}`} className="link">
              parent
            </LinkRouter>{" "}
            |{" "}
          </>
        ) : null}
        on:{" "}
        <LinkRouter to={`/user/${comment.by}`} className="link">
          {parentStory.title}
        </LinkRouter>{" "} */}
      </Typography>
    );
  };

  const getCommentText = () => {
    return (
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      ></Typography>
    );
  };

  return !comment.deleted ? (
    <Box>
      <Stack divider={<Divider />} spacing={1}>
        <Box className={`comment-level-${level}`}>
          {getCommentHeader()}
          {getCommentText()}
        </Box>
        {comment.kids
          ? comment.kids.map((child) => (
              <Comment
                key={child}
                commentID={child}
                level={level + 1}
              ></Comment>
            ))
          : null}
      </Stack>
    </Box>
  ) : null;
}
