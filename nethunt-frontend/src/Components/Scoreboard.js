import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography,Box, Stack } from '@mui/material';
import ScoreImg from "./../Images/Scoreboard.svg";
const scoreboardColumns = [
    { id: "sno", label: "S.No.", minWidth: 100 },
    { id: "name", label: "Name.", minWidth: 200 },
    { id: "cname", label: "College", minWidth: 300 },
    { id: "status", label: "Status.", minWidth: 100 },
    { id: "score", label: "Score.", minWidth: 100, align: "right" },
]
var scoreboard = []
for (let i = 0; i < 20; i++) {
    let sno = i + 1;
    let name = "Sanjay";
    let cname = "PSG TECH";
    let score = 1000
    let status = "offline"
    scoreboard.push({ sno, name, cname, status, score })
}
// console.log(scoreboard)
export default function ScoreBoardX() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', marginTop: 3 }}>
            <Stack direction={"horizontal"} sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}>
                <Box>
                    <img src={ScoreImg} width="100px"/>
                </Box>
                <Typography p={2} variant="h5">
                    Scoreboard
                </Typography>
            </Stack>
            <TableContainer sx={{ maxHeight: "100vh" }}>
                <Table >
                    <TableHead sx={{ backgroundColor: "black" }}>
                        <TableRow>
                            {scoreboardColumns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scoreboard
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                // console.log(row)
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.sno} sx={{ backgroundColor: row.sno == 1 ? "#ab00a7" : row.sno == 2 ? "#22008a" : (theme) => { return theme.palette.background }, }}>
                                        {scoreboardColumns.map((column) => {
                                            const value = row[column.id];
                                            //   console.log(row.sno);
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={scoreboard.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}