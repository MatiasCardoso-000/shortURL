import { nanoid } from "nanoid";
import { UrlModel } from "../models/url.model.js";
import path from "node:path";

export const home = (req, res) => {
  const __dirname = import.meta.dirname;
  const publicPath = path.join(__dirname, "public");

  res.send(publicPath);
};

export const readURLs = async (req, res) => {
  try {
    const urls = await UrlModel.find();
    return res.json(urls);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const createUrl = async (req, res) => {
  const { origin } = req.body;
  if (!origin) {
    res.status(400).json({ error: "Field origin is required" });
    return;
  }

  try {
    const newUrl = await UrlModel.create({ origin, shortURL: nanoid(8) });
    res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error al agregar la url", error });
  }
};

export const findById = async (req, res) => {
  try {
    const { uid } = req.params;
    const url = await UrlModel.findOneById(uid);
    res.json(url);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateOneById = async (req, res) => {
  const { uid } = req.params;
  const { origin } = req.body;
  try {
    await UrlModel.updateOneById(uid, origin);

    res.redirect("/");
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const deleteById = async (req, res) => {
  const { uid } = req.params;

  try {
    await UrlModel.deleteById(uid);
    console.log(`url deleted ${uid}`);
  } catch (error) {
    console.log(error);
  }
};

export const redirectTo = async (req, res) => {
  const { shortURL } = req.params;
  
  try {
    const url = await UrlModel.findOne(shortURL);
    console.log(url);
    
    res.redirect(url.origin);
  } catch (error) {
    console.log(error);
  }
};
