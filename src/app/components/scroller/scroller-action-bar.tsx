import React from "react";

import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";

import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useAppDispatch, useAppSelector } from "~/hooks/useStore";

import { add, remove } from "~/features/saved/savedSlice";

import type { Article } from "../article-card/article-card";
import type { StackProps } from "@mui/material";

interface ScrollerActionBarProps extends StackProps {
  setModalActive: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

/**
 * Focusable interactive icon button with shaded background
 */
const IconButtonShaded = styled(IconButton)(({ theme }) => {
  return {
    position: "relative",
    overflow: "hidden",
    zIndex: "1",

    "&:after": {
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
  };
});

/**
 * Bar, technically a column, containing the available actions for a scroller
 * @param props Stack props
 * @returns
 */
export default function ScrollerActionBar(props: ScrollerActionBarProps) {
  const { sx, setModalActive } = props;

  const savedArticles: Article[] = useAppSelector((state) => state.saved.value);
  const displayedArticle: Article | undefined = useAppSelector(
    (state) => state.ui.display,
  );
  const dispatch = useAppDispatch();

  // Popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? "scroller-popover" : undefined;

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "80px",
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
          spacing={2}
          sx={{
            display: "flex",
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          {/* Saved / Bookmark */}
          <Tooltip title="Save this article" placement="left">
            <Stack
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButtonShaded
                title="Save"
                size="large"
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
              </IconButtonShaded>

              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: "center",
                  textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                Save
              </Typography>
            </Stack>
          </Tooltip>

          {/* Miscellaneous menu */}
          <Tooltip title="More" placement="left">
            <Stack
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButtonShaded
                title="Toggle collapsed items"
                size="large"
                aria-describedby={popoverId}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButtonShaded>
            </Stack>
          </Tooltip>

          {/* Popover for miscellaneous menu */}
          <Popover
            id={popoverId}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                style: {
                  borderRadius: "16px",
                  width: "300px",
                },
              },
            }}
          >
            <List
              component="nav"
              aria-label="Popover menu for collapsed items"
              sx={{
                width: "100%",
              }}
              onClick={() => handleClose()}
            >
              <ListItemButton
                onClick={() =>
                  setModalActive((prev) => ({
                    ...prev,
                    savedArticleModal: !prev?.savedArticleModal,
                  }))
                }
              >
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Open saved items" />
              </ListItemButton>
            </List>
          </Popover>
        </Stack>
      )}
    </Stack>
  );
}
