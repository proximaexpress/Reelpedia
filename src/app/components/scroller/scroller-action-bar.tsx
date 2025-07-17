import React from "react";

import {
  IconButton,
  Popover,
  Stack,
  type StackProps,
  Typography,
  useTheme,
} from "@mui/material";

import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { useAppDispatch, useAppSelector } from "~/hooks/useStore";

import { add, remove } from "~/features/saved/savedSlice";

import type { Article } from "../article-card/article-card";

type ScrollerActionBarProps = StackProps;

export default function ScrollerActionBar(props: ScrollerActionBarProps) {
  const { sx } = props;

  const theme = useTheme();

  const savedArticles: Article[] = useAppSelector((state) => state.saved.value);
  const displayedArticle: Article | undefined = useAppSelector(
    (state) => state.ui.display,
  );
  const dispatch = useAppDispatch();

  // Popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "80px",
        height: "100vh",
        px: 1,
        pt: "5vh",
        overflow: "hidden",

        "@media screen and (orientation: landscape)": {
          height: "calc(100vh - 96px)",
        },

        ...(sx ?? {}),
      }}
    >
      {displayedArticle && (
        <Stack
          sx={{
            display: "flex",
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          <Stack
            aria-owns={open ? "bookmark-hover-popover" : undefined}
            aria-haspopup="true"
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <IconButton
              title="delete"
              size="large"
              aria-label="delete"
              sx={{
                position: "relative",
                overflow: "hidden",
                zIndex: "1",

                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "50%",
                  background:
                    theme.palette.mode == "dark"
                      ? "rgba(128, 128, 128, 0.75)"
                      : "rgba(128, 128, 128, 0.75)",
                  filter: "blur(16px)",
                  zIndex: -1,
                },
              }}
              onClick={() => {
                if (!displayedArticle) {
                  return;
                }

                if (!savedArticles.includes(displayedArticle)) {
                  dispatch(add(displayedArticle));
                } else {
                  dispatch(remove(displayedArticle));
                }
              }}
            >
              {!savedArticles.includes(displayedArticle) ? (
                <BookmarkIcon />
              ) : (
                <BookmarkAddedIcon />
              )}
            </IconButton>

            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "center",
                textShadow: "0 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              Save
            </Typography>

            <Popover
              id="bookmark-hover-popover"
              sx={{ pointerEvents: "none" }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography variant="subtitle2" sx={{ p: 1 }}>
                Save this article
              </Typography>
            </Popover>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
