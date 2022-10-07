import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Link,
  Typography,
} from "@mui/material";

interface ImageItemProps {
  id: string;
  urlPreview?: string;
  urlOriginal: string;
  otherSizes: string[];
}

export const ImageItem = ({ id, urlOriginal, urlPreview, otherSizes }: ImageItemProps) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={urlOriginal} src={urlPreview || urlOriginal} variant="square" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link href={urlOriginal} sx={{ color: "white" }} target="_blank">
            See original image
          </Link>
        }
        secondary={
          <>
            {otherSizes.map((sizes, i) => (
              <span key={sizes}>
                <Link
                  href={sizes}
                  target="_blank"
                  color="inherit"
                  variant="caption"
                  sx={i < otherSizes.length - 1 ? { marginRight: 1 } : {}}
                >
                  {new URL(sizes).pathname.replace(`/${id}/`, "")}
                </Link>
              </span>
            ))}
            <Typography variant="caption" sx={{ display: "block" }}>
              You can also select these sizes..
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};
