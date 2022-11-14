import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





export default function BasicTable() {
    const dummy = [{
        'id': 0,
        'q1': 'q1',
        'ans1': 'a1',
        'ans2': 'a2',
        'ans3': 'a3'
    }, {
        'id': 1,
        'q1': 'q2',
        'ans1': 'a1',
        'ans2': 'a2',
        'ans3': 'a3'
    }]
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Question</TableCell>
                        <TableCell align="right">Ans Link 1</TableCell>
                        <TableCell align="right">Ans Link 2</TableCell>
                        <TableCell align="right">Ans Link 3</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummy.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row.q1}</TableCell>
                            <TableCell align="right">{row.ans1}</TableCell>
                            <TableCell align="right">{row.ans2}</TableCell>
                            <TableCell align="right">{row.ans3}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
