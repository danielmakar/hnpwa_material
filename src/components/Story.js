import urlParse from "url-parse";
import { useState, useEffect } from "react";
import { getItem } from "../services/HNService";
import TimeAgo from "react-timeago";
import { Box, Typography, Link, Divider, Stack } from "@mui/material";
import { Link as LinkRouter, useParams } from "react-router-dom";
import Comment from "../components/Comment";

export default function Story({ itemID, isolated, number }) {
  const [story, setStory] = useState({});

  const { storyID } = useParams();

  useEffect(() => {
    itemID
      ? getItem(itemID).then((data) => data && data.id && setStory(data))
      : getItem(storyID).then((data) => data && data.id && setStory(data));
  }, [itemID, storyID]);

  const getStoryTitle = () => {
    return story.url ? (
      <Box>
        <Link
          href={story.url}
          variant="body1"
          sx={{
            textDecoration: "none",
            color: "black",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {story.title} ({urlParse(story.url).hostname})
        </Link>
      </Box>
    ) : (
      <LinkRouter to={`/${story.type}/${story.id}`} className="link">
        <Typography variant="body1">{story.title}</Typography>
      </LinkRouter>
    );
  };

  const getStoryData = () => {
    if (story.type === "job") {
      return (
        <Box>
          <Typography variant="body2">
            <TimeAgo date={story.time * 1000}></TimeAgo>
          </Typography>
        </Box>
      );
    }

    return (
      <Box>
        <Typography variant="body2">
          {story.score} points by{" "}
          <LinkRouter to={`/user/${story.by}`} className="link bold">
            {story.by}
          </LinkRouter>{" "}
          <TimeAgo date={story.time * 1000}></TimeAgo> |{" "}
          <LinkRouter to={`/story/${story.id}`} className="link bold">
            {story.descendants === 1
              ? `${story.descendants} comment`
              : `${story.descendants} comments`}
          </LinkRouter>
        </Typography>
      </Box>
    );
  };

  const getStoryComments = () => {
    if (isolated && story.kids)
      return story.kids.map((kid) => (
        <Comment key={kid} commentID={kid} level={0}></Comment>
      ));
  };

  const getStoryText = () => {
    if (isolated && story.text)
      return (
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: story.text }}
        ></Typography>
      );
  };

  const getStoryNumber = () => {
    if (!isolated)
      return (
        <Typography
          variant="body1"
          sx={{
            fontWeight: "Bold",
            fontSize: "h6.fontSize",
            color: "rgb(158, 156, 156)",
            alignSelf: "center",
            mr: "8px",
          }}
        >
          {number}.
        </Typography>
      );
  };

  return (
    story &&
    story.id && (
      <Box
        sx={
          isolated && {
            ml: {
              xs: "16px",
              sm: "32px",
            },
            mt: "8px",
            mb: "8px",
            mr: {
              xs: "16px",
              sm: "64px",
              md: "128px",
            },
          }
        }
      >
        <Stack divider={<Divider />} spacing={1}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {getStoryNumber()}
            <Box>
              {getStoryTitle()}
              {getStoryData()}
              {getStoryText()}
            </Box>
          </Box>
          {getStoryComments()}
        </Stack>
      </Box>
    )
  );
}
