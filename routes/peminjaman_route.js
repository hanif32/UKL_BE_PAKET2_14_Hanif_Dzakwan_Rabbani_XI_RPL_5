import express from 'express';
import {
  getAllPeminjaman,
  getPeminjamanById,
  addPeminjaman,
  pengembalianBarang,
  getUsageAnalysis,
  getUsagelate
} from '../controllers/peminjaman_controllers.js';
import { authorize } from '../controllers/auth_controller.js'
import { IsAdmin, IsMember } from '../middleware/role_validation.js'

const app = express();

app.get('/borrow', authorize, [IsAdmin], getAllPeminjaman)
app.get('/borrow/:id', authorize, [IsAdmin], getPeminjamanById)
app.post('/borrow', authorize, [IsMember], addPeminjaman)
app.post('/return', authorize, [IsMember], pengembalianBarang)
app.post('/usage-report', getUsageAnalysis)
app.post('/usage-late', getUsagelate)

export default app