import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllBarang = async (req, res) => {
  try {
    const response = await prisma.barang.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBarangById = async (req, res) => {
  try {
    const result = await prisma.barang.findUnique({
      where: {
        id_barang: Number(req.params.id), // Pastikan menggunakan id_barang
      },
    });

    if (!result) {
      return res.status(404).json({ status: "error", msg: "Data not found" });
    }

    // Format output sesuai dengan gambar
    const response = {
      status: "success",
      data: {
        id: result.id_barang, // Sesuaikan dengan field di database
        name: result.name, // Sesuaikan dengan field di database
        category: result.category, // Sesuaikan dengan field di database
        location: result.location, // Sesuaikan dengan field di database
        quantity: result.quantity, // Sesuaikan dengan field di database
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "error", msg: error.message });
  }
};

export const addBarang = async (req, res) => {
    try {
      const { name, category, location, quantity } = req.body;
  
      // Cek dan parse quantity menjadi angka
      const parsedQuantity = parseInt(quantity);
      if (isNaN(parsedQuantity)) {
        return res.status(400).json({
          status: "error",
          message: "Quantity must be a valid number",
        });
      }
  
      const result = await prisma.barang.create({
        data: {
          name: name,
          category: category,
          location: location,
          quantity: parsedQuantity,  // Gunakan angka yang sudah diparse
        },
      });
  
      res.status(200).json({
        status: "success",
        message: "Barang berhasil ditambahkan",
        data: result, // Mengirimkan data barang yang baru dibuat
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: `Error creating barang: ${error.message}`,
      });
    }
  };  

export const updateBarang = async (req, res) => {
    const { name, category, location, quantity } = req.body;
    
    // Validasi id_barang
    const id_barang = Number(req.params.id_barang);
    if (isNaN(id_barang)) {
      return res.status(400).json({
        status: "error",
        message: "id_barang harus berupa angka yang valid",
      });
    }
  
    try {
      const result = await prisma.barang.update({
        where: {
          id_barang: id_barang,  // Pastikan menggunakan id_barang
        },
        data: {
          name,
          category,
          location,
          quantity,
        },
      });
  
      res.status(200).json({
        status: "success",
        message: "Barang berhasil diperbarui",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
};
  
  

export const deleteBarang = async (req, res) => {
  try {
    const result = await prisma.barang.delete({
      where: {
        id_barang: Number(req.params.id), // Pastikan menggunakan id_barang, bukan id_user
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
