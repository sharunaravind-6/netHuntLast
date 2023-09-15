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
import useAxios from '../utils/useAxios';
import { useState } from 'react';
import { useEffect } from 'react';

const scoreboardColumns = [
    { id: "sno", label: "S.No.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 200 },
    { id: "cname", label: "College", minWidth: 300 },
    { id: "status", label: "Status.", minWidth: 100 },
    { id: "score", label: "Score", minWidth: 100, align: "right" },
]
// console.log(scoreboard)
export default function ScoreBoardX() {

    const api = useAxios()
    const [loading, setLoader] = useState(true)
    const [scores,setScores] = useState([])
    async function fetchScores()  {
        setLoader(true)
        const response = await api.get("/game/scorecard")
        setLoader(false)
        if (response?.data?.scores) {
            const sortedScores = response.data.scores.sort((a, b) => b.scores - a.scores);
            setScores(sortedScores);
        }
    }
      
    useEffect(
        () => {
            if (loading) {
                fetchScores();
            }
            setLoader(false);
        },
        [loading]
    )
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // console.log(scores[0].usr.user.email)

    return (
        <Paper sx={{ width: '100%', marginTop: 3, padding:"30px" }}>
            <Stack sx={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center",width:"100%"}}>
                <Box>
                    <img src={ScoreImg} width="100%"/>
                </Box>
                <Typography p={2} variant="h5">
                    Scoreboard
                </Typography>
            </Stack>
            <TableContainer sx={{ maxHeight: "100vh"}}>
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
                        {scores.map((score,index)=>(
                            <TableRow hover role="checkbox" tabIndex={-1} key={index} sx={{ backgroundColor: index=== 1 ? "#ab00a7" : index=== 2 ? "#22008a" : (theme) => { return theme.palette.background }, }}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{score.usr.user.first_name} {scores[index].usr.user.last_name}</TableCell>
                                <TableCell>{score.usr.college.collegeName}</TableCell>
                                <TableCell>{score.usr.status}</TableCell>
                                <TableCell align='right'>{score.scores}</TableCell>
                            </TableRow>
                        ))
                        }
                        
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={scores.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}