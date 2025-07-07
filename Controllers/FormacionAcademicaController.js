import { FormacionAcademicaModel } from "../Models/FormacionAcademicaModel.js";
import { createRequire } from 'node:module';
import { FuncionariosModel } from '../Models/FuncionariosModel.js'; // Asegúrate de importar el modelo de Funcionarios

const req = createRequire(import.meta.url);

export class FormacionAcademicaController{

  static async getFormacionesAcademicas(req, res){
    try {
      const formaciones = await FormacionAcademicaModel.findAll({
         order: [['id', 'ASC']],
                      include: [{ model: FuncionariosModel, as: 'funcionarios' }]
                    });
      res.json(formaciones);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener formaciones académicas" });
    }
  }


    static async getFormacionesAcademicasById(req, res){
      try {
        const data = await FormacionAcademicaModel.findByPk(req.params.id);
        if (!data) return res.status(404).json({ error: 'No encontrado' });
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

  static async createFormacionAcademica(req, res){
    try {
      const formacion = await FormacionAcademicaModel.create(req.body);
      res.status(201).json(formacion);
    } catch (error) {
      res.status(500).json({ error: "Error al crear formación académica" });
    }
  }


  static async updateFormacionAcademica(req, res){
    try {
      const { id } = req.params;
      await FormacionAcademicaModel.update(req.body, { where: { id } });
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar formación académica" });
    }
  }


  static async deleteFormacionAcademica(req, res){
    try {
      const { id } = req.params;
      await FormacionAcademicaModel.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar formación académica" });
    }
  }

}

