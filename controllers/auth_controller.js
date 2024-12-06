import md5 from "md5";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secretKey = "moklet";

export const authenticate = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCek = await prisma.user.findFirst({
      where: {
        username,
        password: md5(password),
      },
    });
    if (userCek) {
      const payload = JSON.stringify(userCek);
      const token = jwt.sign(payload, secretKey);
      res.status(200).json({
        status: "success",
        message: "Login berhasil",
        token,
      });
    } else {
      res.status(404).json({
        status: "error",
        logged: false,
        message: "Username or password invalid",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const verifiedUser = jwt.verify(token, secretKey);
      if (!verifiedUser) {
        res.status(403).json({
          success: false,
          auth: false,
          message: "Permission denied",
        });
      } else {
        req.user = verifiedUser;
        next();
      }
    } else {
      res.status(403).json({
        success: false,
        message: "Authorization header missing",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
