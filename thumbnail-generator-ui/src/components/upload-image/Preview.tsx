import { Box } from "@mui/system";

interface PreviewProps {
  src: string | undefined;
}

export const Preview = ({ src }: PreviewProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        border: '1px solid #8888',
        "img": {
            maxHeight: 150
        }
      }}
    >
      <img alt="Preview" src={src} />
    </Box>
  );
};
