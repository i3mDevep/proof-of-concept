import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Link,
} from "@mui/material";

interface ImageItemProps {
  id: string;
  urlOriginal: string;
  otherSizes: string[];
}

export const ImageItem = ({ id, urlOriginal, otherSizes }: ImageItemProps) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={urlOriginal} src={urlOriginal} variant="square" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link href={urlOriginal} sx={{ color: "white" }} target="_blank">
            Original image
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
          </>
        }
      />
    </ListItem>
  );
};
