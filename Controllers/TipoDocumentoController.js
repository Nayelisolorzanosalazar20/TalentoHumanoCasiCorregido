import { TipoDocumentosModel } from '../Models/TipoDocumentosModel.js';
import { createRequire } from 'node:module';

const req = createRequire(import.meta.url);


export class TipoDocumentoController{


  static async createTipoDocumento(req, res){
    try {
      const tipodocumento = await TipoDocumentosModel.create(req.body);
      res.status(201).json(tipodocumento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async getTiposDocumento(req, res){
    try {
      const tipodocumento = await TipoDocumentosModel.findAll({
        order: [['id', 'ASC']],
      });
      return res.status(200).json({ tipodocumento });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async getTipoDocumentoById(req, res){
    try {
      const tipodocumento = await TipoDocumentosModel.findByPk(req.params.id);
      if (!tipo_documentos) return res.status(404).json({ error: 'No encontrado' });
      res.json(tipodocumento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Guardar nueva tipo de documento
   static async saveTDiscapacidad(req, res) {
     try {
       const tipodocumento = await TipoDocumentosModel.create(req.body);
       res
         .status(201)
         .json({ message: "Guardada correctamente", tipo_documentos: tipodocumento });
     } catch (error) {
       res
         .status(500)
         .json({ error: "Error al guardar", message: error.message });
     }
   }
 
  


  static async updateTipoDocumento(req, res){
    try {
      const [updated] = await TipoDocumentosModel.update(req.body, { where: { id: req.params.id } });
      updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async deleteTipoDocumento(req, res){
    try {
      const deleted = await TipoDocumentosModel.destroy({ where: { id: req.params.id } });
      deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

