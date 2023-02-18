import { EmojiObjectsRounded, QuestionAnswerOutlined, SpeedRounded } from "@mui/icons-material";
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack } from "@mui/material";

export default function AddQuestion() {
    return (<Paper sx={{ padding: 2 }}><Stack padding={2} sx={{ gap: 3 }}>
        <FormControl>
            <InputLabel htmlFor="answer">
                Answer
            </InputLabel>
            <Input
                id="answer"
                fullWidth
                startAdornment={
                    <InputAdornment position="start">
                        <QuestionAnswerOutlined />
                    </InputAdornment>
                }
            />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="hint1">
                Hint 1
            </InputLabel>
            <Input
                id="hint1"
                fullWidth
                defaultValue={"Sample hint1"}
                startAdornment={
                    <InputAdornment position="start">
                        <EmojiObjectsRounded />
                    </InputAdornment>
                }
            />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="hint2">
                Hint 2
            </InputLabel>
            <Input
                id="hint2"
                fullWidth
                
                defaultValue={"Sample hint2"}
                startAdornment={
                    <InputAdornment position="start">
                        <EmojiObjectsRounded />
                    </InputAdornment>
                }
            />
        </FormControl>
        <FormControl fullWidth>
            <InputLabel id="year-select-label">Difficulty Level</InputLabel>
            <Select
                labelId="year-select-label"
                id="year-select"
                label="Year"
                onChange={(event) => {}}
                startAdornment={
                    <InputAdornment position="start">
                        <SpeedRounded />
                    </InputAdornment>
                }
            >
                <MenuItem value={"Easy"}>{"Easy"}</MenuItem>
                <MenuItem value={"Moderate"}>{"Moderate"}</MenuItem>
                <MenuItem value={"Hard"}>{"Hard"}</MenuItem>
            </Select>
        </FormControl>
    </Stack>
    </Paper>)
}