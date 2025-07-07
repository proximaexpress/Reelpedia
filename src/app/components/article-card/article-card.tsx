import { Box, Stack, Typography } from "@mui/material";

import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";

export interface Article {
  title: string;
  extract: string;
  image: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ArticleCardProps extends Article {}

export default function ArticleCard(props: ArticleCardProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        maxWidth: "sm",
        p: 0,
        position: "relative",
        scrollSnapAlign: "start",

        "@media screen and (orientation: landscape)": {
          height: "calc(100vh - 96px)",
          width: "calc((100vh - 96px)*0.5625)",
        },
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${props?.image ? props.image : ""})`,
        }}
      >
        {!props?.image && (
          <ImageNotSupportedOutlinedIcon
            sx={{
              fontSize: "5em",
              my: "25%",
            }}
          />
        )}
      </Box>

      {/* Content banner */}
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            p: 3,
            backgroundImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.15))",
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              color: "white",
            }}
          >
            {props.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              //maxHeight: "7.5em",
              color: "white",
              display: "-webkit-box",
              "-webkit-line-clamp": "6",
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
            }}
          >
            {props.extract}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
