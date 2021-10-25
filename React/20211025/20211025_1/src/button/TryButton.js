import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function IconButtonSizes() {
    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="large">
                <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}

export default function TryButton() {
    const [value, setValue] = React.useState(2);
    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Link
                    underline="none"
                    color="inherit"
                    href="https://www.naver.com"
                >
                    <Button color="secondary">Secondary</Button>
                </Link>
                <Button variant="contained" color="success">
                    Success
                </Button>
                <Button variant="outlined" color="error">
                    Error
                </Button>
                {IconButtonSizes()}

                <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                />
            </Stack>

            {/* 별점  */}
            <Box
                sx={{
                    "& > legend": { mt: 2 },
                }}
            >
                <Typography component="legend">Controlled</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <Typography component="legend">Read only</Typography>
                <Rating name="read-only" value={value} readOnly />
                <Typography component="legend">Disabled</Typography>
                <Rating name="disabled" value={value} disabled />
                <Typography component="legend">No rating given</Typography>
                <Rating name="no-value" value={null} />
            </Box>
        </div>
    );
}
