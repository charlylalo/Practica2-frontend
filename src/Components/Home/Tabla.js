import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Tabla({res}) {
  return(
    <div style={{ display: "flex", flex: 1, margin: "50px 0" }}>
          {res?.length > 0 ? <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 50 }}>
              <div className='paper'>Monto final: ${(res[res.length - 1].saldoFinal).toFixed(2)}</div>
              <div className='paper'>Ganancia por inversión: ${(res[res.length - 1].gananciaInv).toFixed(2)}</div>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Año</TableCell>
                    <TableCell align="right">Saldo Inicial</TableCell>
                    <TableCell align="right">Aportación</TableCell>
                    <TableCell align="right">Rendimiento</TableCell>
                    <TableCell align="right">Saldo Final</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {res.map((row, i) => (
                    <TableRow
                      key={"row" + i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.year}
                      </TableCell>
                      <TableCell align="right">${row.saldoInicial.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.aportacionInic.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.rendimiento.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.saldoFinal.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div> : null}
        </div>
  )
}