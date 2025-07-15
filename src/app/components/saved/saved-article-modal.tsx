import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Stack,
  Typography,
  styled,
} from "@mui/material";

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
      <Stack
        className="scroller-player"
        sx={{
          px: 2,
          py: 4,
          border: "1px solid #20252a",
          backgroundColor: "#0f0f0f",
          boxShadow: 24,
        }}
      >
        <Stack
          direction="row"
          spacing={4}
          sx={{
            px: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography
            id="saved-article-modal-title"
            component="h2"
            variant="h5"
            sx={{
              color: "white",
            }}
          >
            Saved Articles
          </Typography>

          <Button
            variant="text"
            size="large"
            endIcon={<SaveAltIcon />}
            sx={{
              pr: 8,
              color: "white",
            }}
            onClick={() => {
              console.log(savedArticles);
            }}
          >
            Save
          </Button>
        </Stack>

        <Box
          sx={{
            mx: 2,
            pr: 2,
            flexGrow: "1",
            overflow: "auto",
          }}
        >
          {savedArticles.map((a) => {
            return (
              <CardActionArea
                key={a.title}
                sx={{
                  mb: 2,
                }}
              >
                <Grid
                  container
                  spacing={0}
                  sx={{
                    py: 2,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(33, 33, 33, 1)",
                    borderRadius: 4,
                  }}
                >
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
                        color: "white",
                      }}
                    >
                      {a.title}
                    </Typography>
                  </Grid>

                  <Grid size={12}>
                    <CardContentNoBottomPadding>
                      <Typography
                        sx={{
                          color: "white",
                        }}
                      >
                        {a.extract}
                      </Typography>
                    </CardContentNoBottomPadding>
                  </Grid>
                </Grid>
              </CardActionArea>
            );
          })}
        </Box>
      </Stack>
    </Modal>
  );
}
