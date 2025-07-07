import { DocumentosModel } from '../Models/DocumentosModel.js';
import { createRequire } from 'node:module';

const req = createRequire(import.meta.url);

export class DocumentosController{

static async createDocumento(req, res){
  
  try {
    const data = await DocumentosModel.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async getDocumentos(req, res){
  try {
    const data = await DocumentosModel.findAll({
      order: [['id', 'ASC']],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async getDocumentoById(req, res){
  try {
    const data = await DocumentosModel.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
}

static async updateDocumento(req, res){
  try {
    const [updated] = await DocumentosModel.update(req.body, { where: { id: req.params.id } });
    updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async deleteDocumento(req, res){
  try {
    const deleted = await DocumentosModel.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}
