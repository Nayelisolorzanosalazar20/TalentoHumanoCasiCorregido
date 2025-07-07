import { EstadoCivilModel } from "../Models/EstadoCivilModel.js";
import { createRequire } from 'node:module';

const req = createRequire(import.meta.url);

export class EstadoCivilController{

  static async getEstadosCiviles(req, res){
    try {
      const ecivil = await EstadoCivilModel.findAll({
        order: [['id', 'ASC']],
      });
      return res.status(200).json({ecivil});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los estados civiles" });
    }
  }


  static async getEstadosCivilesById(req, res){
    try {
      const ecivil = await EstadoCivilModel.findByPk(req.params.id);
      if (!ecivil) return res.status(404).json({ error: 'No encontrado' });
      res.json(ecivil);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

    static async saveEcivil(req, res) {
      try {
        const ecivil = await EstadoCivilModel.create(req.body);
        res.status(201).json({ message: 'Genero guardado correctamente', estadocivil: ecivil });
      } catch (error) {
        res.status(500).json({ error: 'Error al guardar el Genero', message: error.message });
      }
    }

    // Actualizar etnia
    static async updateEcivil(req, res) {
      try {
        const [updated] = await EstadoCivilModel.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedestadocivil = await EstadoCivilModel.findByPk(req.params.id);
          res.json({ message: 'Etnia actualizada correctamente', estadocivil: updatedestadocivil });
        } else {
          res.status(404).json({ error: 'Etnia no encontrada' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la etnia', message: error.message });
      }
    }

  static async deleteEstadoCivil(req, res){
    try {
          const estadocivil = await EstadoCivilModel.findByPk(req.params.id);
          if (!estadocivil) return res.status(404).json({ message: "No encontrado" });
          await estadocivil.destroy();
          res.json({ message: "Eliminado correctamente" });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }


}

