import { Divider, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Story from "../components/Story";
import { getItems } from "../services/HNService";

export default function Stories({ storyType }) {
  const [stories, setStories] = useState([]);
  const [storyCount, setStoryCount] = useState(30);

  const handlePageChange = (evt, page) => {
    setStoryCount(page * 30);
  };

  useEffect(() => {
    getItems(storyType).then((data) => data && setStories(data));
  }, [storyType]);

  return (
    <div>
      <Stack
        divider={<Divider />}
        spacing={1}
        sx={{
          ml: {
            xs: "16px",
            sm: "32px",
          },
          mr: {
            xs: "16px",
            sm: "64px",
            md: "128px",
          },
        }}
      >
        {stories.slice(storyCount - 30, storyCount).map((storyID) => (
          <Story
            key={storyID}
            itemID={storyID}
            isolated={false}
            number={stories.indexOf(storyID) + 1}
          ></Story>
        ))}
      </Stack>
      {stories && stories.length > 0 && (
        <Pagination
          count={parseInt(stories.length / 30) + 1}
          onChange={handlePageChange}
          sx={{
            ml: {
              xs: "16px",
              sm: "32px",
            },
            mt: "8px",
            mb: "8px",
          }}
        ></Pagination>
      )}
    </div>
  );
}
