import { CargoAsignadoModel } from "../Models/CargoAsignadoModel.js";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export class CargoAsignadoController {

     static async createCargoAsignado(req, res) {
        try {
          const data = await CargoAsignadoModel.create(req.body);
          res.status(201).json(data);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
  static async getCargoAsignado(req, res) {
    try {
      const cargo_asignado = await CargoAsignadoModel.findAll({
        order: [['id', 'ASC']],
      });
      return res.status(200).json({ cargo_asignado });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getCargoAsignadoById(req, res) {
    try {
      const cargo_asignado = await CargoAsignadoModel.findByPk(req.params.id);
      if (!cargo_asignado) return res.status(404).json({ error: "No encontrado" });
      res.json(cargo_asignado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  static async saveCargoAsignado(req, res) {
    try {
      const cargo_asignado = await CargoAsignadoModel.create(req.body);
      res
        .status(201)
        .json({ message: "Guardada correctamente", cargo_asignado: cargo_asignado });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al guardar", message: error.message });
    }
  }

  static async updateCargoAsignado(req, res) {
    try {
      const [updated] = await CargoAsignadoModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedCargoAsignado = await CargoAsignadoModel.findByPk(req.params.id);
        res.json({ message: "Actualizada correctamente", cargo_asignado: updatedCargoAsignado });
      } else {
        res.status(404).json({ error: "Mo encontrada" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar", message: error.message });
    }
  }

  static async deleteCargoAsignado(req, res) {
    try {
      const deleted = await CargoAsignadoModel.destroy({
        where: { id: req.params.id },
      });
      deleted
        ? res.json({ message: "Eliminado" })
        : res.status(404).json({ error: "No encontrado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
