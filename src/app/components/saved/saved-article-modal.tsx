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

import type { Article } from "../article-card/article-card";
import type { JSX } from "react";

import "~/components/scroller/scroller.css";

interface SavedArticleModalProps {
  active: boolean;
  savedArticles: Article[];
}

const CardContentNoBottomPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 0;
  }
`);

export default function SavedArticleModal(
  props: SavedArticleModalProps,
): JSX.Element {
  const { active, savedArticles } = props;

  const theme = useTheme();

  return (
    <Modal
      open={active}
      //aria-labelledby="saved-article-modal-title"
      //aria-describedby="saved-article-modal-title"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          color="primary"
          aria-label="close modal"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: "1",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Stack
          className="scroller-player"
          sx={{
            py: 2,
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 24,
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
                console.log(savedArticles);
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
                    aria-label="close modal"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: "1",
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
