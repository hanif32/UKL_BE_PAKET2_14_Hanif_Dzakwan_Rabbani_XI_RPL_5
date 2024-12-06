import express from 'express'
import {
   getAllBarang,
   getBarangById,
   addBarang,
   updateBarang,
   deleteBarang
} from '../controllers/barang_controller.js'


const app = express()


app.get('/', getAllBarang)
app.get('/:id', getBarangById)
app.post('/', addBarang)
app.put('/update-barang/:id_barang', updateBarang)
app.delete('/:id', deleteBarang)

export default app