import { GeneroModel } from "../Models/GeneroModel.js";
import { createRequire } from 'node:module';

const req = createRequire(import.meta.url);

export class GeneroController{

  static async getGeneros(req, res){
    try {
      const generos = await GeneroModel.findAll({
        order: [['id', 'ASC']],
      });
      return res.status(200).json({generos});
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
  }


  static async getGeneroById(req, res){
    try {
      const generos = await GeneroModel.findByPk(req.params.id);
      if (!generos) return res.status(404).json({ message: "No encontrado" });
      res.json(generos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


    static async saveGenero(req, res) {
      try {
        const generos = await GeneroModel.create(req.body);
        res.status(201).json({ message: 'Guardado correctamente', genero: generos });
      } catch (error) {
        res.status(500).json({ error: 'Error al guardar', message: error.message });
      }
    }

    // Actualizar etnia
    static async updateGenero(req, res) {
      try {
        const [updated] = await GeneroModel.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedGenero = await GeneroModel.findByPk(req.params.id);
          res.json({ message: 'Actualizada correctamente', etnia: updatedGenero });
        } else {
          res.status(404).json({ error: 'No encontrada' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar', message: error.message });
      }
    }


  static async deleteGenero(req, res){
    try {
      const generos = await GeneroModel.findByPk(req.params.id);
      if (!generos) return res.status(404).json({ message: "No encontrado" });
      await generos.destroy();
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}
