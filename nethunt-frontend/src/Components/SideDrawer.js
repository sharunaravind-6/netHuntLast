import { Drawer } from "@mui/material";

export function SideDrawer() {
    return <Drawer anchor="left" open={false} sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 240,
        },
    }}
        variant="persistent">
        Test
    </Drawer>
}