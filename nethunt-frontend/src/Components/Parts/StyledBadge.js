import { Badge, styled } from "@mui/material";

export default function StyledBadge(props,) {
    const BadgeModified = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: props.color === "green" ? "#0f0" : '#f00',
            color: '#f00',
            boxShadow: `0 0 0 .5px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                content: '" "',
            },
        },
    }));
    return (<BadgeModified
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
    >{props.children}
    </BadgeModified>)
}