import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { useAppDispatch, useAppSelector } from "~/hooks/useStore";

import { remove } from "~/features/saved/savedSlice";

import type { Article } from "../article-card/article-card";
import type { JSX } from "react";
import type { ModalProps } from "@mui/material";

export interface SavedArticleModalProps extends Omit<ModalProps, "children"> {
  setModalActive: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const CardContentNoBottomPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 0;
  }
`);

/**
 * Modal exposing saved / bookmarked articles
 * @param props Modal props
 * @returns
 */
export default function SavedArticleModal(
  props: SavedArticleModalProps,
): JSX.Element {
  const { sx, setModalActive } = props;

  const theme = useTheme();

  const device = useAppSelector((state) => state.ui.device);
  const savedArticles: Article[] = useAppSelector((state) => state.saved.value);
  const dispatch = useAppDispatch();

  return (
    <Modal
      {...props}
      onClose={() => {
        setModalActive((prev) => ({
          ...prev,
          savedArticleModal: !prev?.savedArticleModal,
        }));
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Modal close button */}
        <IconButton
          color="primary"
          aria-label="close modal"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: "1",
          }}
          onClick={() => {
            setModalActive((prev) => ({
              ...prev,
              savedArticleModal: !prev?.savedArticleModal,
            }));
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Card container */}
        <Stack
          sx={{
            // Generally bad practice to depend on window.innerHeight, however,
            // this is probably the best way to compensate for mobile browsers.
            height: device.type == "desktop" ? "100vh" : device.height + "px",
            width: "100vw",
            pt: 2,
            backgroundColor: theme.palette.background.paper,

            "@media screen and (orientation: landscape)": {
              height: "calc(100vh - 96px)",
              width: "calc((100vw - 96px) * 0.8) !important",
              borderColor: theme.palette.divider,
              borderRadius: 4,
              boxShadow: 24,
            },
          }}
        >
          {/* Header */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              px: 2,
              pr: 5,
              mb: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography
              id="saved-article-modal-title"
              component="h2"
              variant="h5"
            >
              Saved Articles
            </Typography>

            <Button
              variant="text"
              endIcon={<SaveAltIcon />}
              onClick={() => {
                // Export saved articles as a CSV file
                const csvData = [
                  ["Title", "Extract", "Image"],
                  ...savedArticles.map((a) => [
                    a.title,
                    a.extract,
                    a?.image ?? "",
                  ]),
                ];
                const csvDataString = csvData
                  .map((a) =>
                    a.map((b) => `"${b.replaceAll('"', '""')}"`).join(","),
                  )
                  .join("\n");

                const blob = new Blob([csvDataString], { type: "text/csv" });
                const blobURL = URL.createObjectURL(blob);

                const el = document.createElement("a");
                el.href = blobURL;
                el.download = "saved-articles.csv";
                document.body.appendChild(el);
                el.click();

                setTimeout(() => {
                  URL.revokeObjectURL(blobURL);
                  document.body.removeChild(el);
                }, 0);
              }}
            >
              Save
            </Button>
          </Stack>

          {/* Articles */}
          <Box
            sx={{
              px: 2,
              flexGrow: "1",
              overflow: "auto",
            }}
          >
            {savedArticles.map((a) => {
              return (
                <Box key={a.title} sx={{ position: "relative" }}>
                  <IconButton
                    color="primary"
                    aria-label="remove saved article"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: "1",
                    }}
                    onClick={() => {
                      dispatch(remove(a));
                    }}
                  >
                    <CloseIcon />
                  </IconButton>

                  <CardActionArea
                    key={a.title}
                    sx={{
                      mb: 2,
                      py: 2,
                      border: "1px solid",
                      borderColor: theme.palette.divider,
                      borderRadius: 4,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    onClick={() => {
                      window
                        .open(
                          `https://en.wikipedia.org/wiki/${a.title}`,
                          "_blank",
                        )
                        ?.focus();
                    }}
                  >
                    <Grid container spacing={0}>
                      <Grid size={4}>
                        <CardMedia
                          component="img"
                          src={a?.image}
                          alt={a.title}
                          sx={{
                            px: 2,
                          }}
                        />
                      </Grid>

                      <Grid size={8}>
                        <Typography
                          component="h3"
                          variant="h6"
                          sx={{
                            px: 4,
                          }}
                        >
                          {a.title}
                        </Typography>
                      </Grid>

                      <Grid size={12}>
                        <CardContentNoBottomPadding>
                          <Typography>{a.extract}</Typography>
                        </CardContentNoBottomPadding>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
