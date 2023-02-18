import Button from '@mui/material/Button';
import CalculateService from '../Service/Service';
import { AlertTitle, TextField } from '@mui/material';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Form({ setRes }) {

  const [data, setData] = useState({
    inversionInicial: 0,
    porcIncAnual: 0,
    aportacionAnual: 0,
    investYear: 0,
    rendimientoInv: 0
  })
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false);
  const [msjError, setMsjError] = useState({
    titulo: "",
    subTitulo: ""
  })
  const [load, setLoad] = useState(false)

  const handleChange = (e) => {
    if (errors[e.target.id]) setErrors(prev => ({ ...prev, [e.target.id]: false }))
    setData(prev => ({ ...prev, [e.target.id]: Number(e.target.value) }))
  }

  const handleClose = () => {
    setOpen(false)
  }

  const sendData = async () => {
    setLoad(true)
    let errores = {}
    if (data.inversionInicial < 1000) errores["inversionInicial"] = true
    if (data.investYear < 1) errores["investYear"] = true
    if (data.rendimientoInv < 1) errores["rendimientoInv"] = true
    setErrors(errores)
    if (Object.keys(errores).length === 0) {
      const res = await CalculateService.getInvestment(data)
      if (res.status === 200) setRes(res.data)
      else {
        setMsjError({
          titulo: res.data.Causa,
          subTitulo: res.data.Error
        })
        setOpen(true)
      }
    }
    setLoad(false)
  }

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>

        <div>
          <TextField error={errors.inversionInicial} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} helperText={errors.inversionInicial ? "Debe ser mayor o igual a $1000" : null} type="number" id="inversionInicial" onChange={handleChange} label="Inversión inicial" variant="standard" />
        </div>
        <div>
          <TextField type="number" id="aportacionAnual" InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} onChange={handleChange} label="Aportación anual" variant="standard" />
        </div>
        <div>
          <TextField type="number" helperText={errors.investYear ? "No puede ser cero" : null} error={errors.investYear} id="investYear" label="Años de inversión" onChange={handleChange} variant="standard" />
        </div>


      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", margin: "50px 0 0 0" }}>
        <div>
          <TextField type="number" id="porcIncAnual" label="% de incremento anual" onChange={handleChange} variant="standard" />
        </div>
        <div>
          <TextField type="number" helperText={errors.rendimientoInv ? "No puede ser cero" : null} error={errors.rendimientoInv} id="rendimientoInv" label="% de rendimiento" onChange={handleChange} variant="standard" />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "50px 0 0 0" }}>
        <Button variant="contained" href="#contained-buttons" type='submit' onClick={sendData} >
          Calcular
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>{msjError.titulo}</AlertTitle>
          {msjError.subTitulo}
        </Alert>
      </Snackbar>
    </div>
  )
}