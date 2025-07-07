import { FuncionariosModel } from "../Models/FuncionariosModel.js";
import { createRequire } from "node:module";
import { ParroquiaModel } from "../Models/ParroquiaModel.js";
import { GeneroModel } from "../Models/GeneroModel.js";
import { EstadoCivilModel } from "../Models/EstadoCivilModel.js";
import { EtniaModel } from "../Models/EtniaModel.js";
import { TipoDiscapacidadModel } from "../Models/TipoDiscapacidadModel.js";
import { GradoDiscapacidadModel } from "../Models/GradoDiscapacidadModel.js";
import { CantonModel } from '../Models/CantonModel.js';
import { TrayectoriaModel } from '../Models/TrayectoriaModel.js';
import { InformacionBancariaModel } from '../Models/InformacionBancariaModel.js';
const req = createRequire(import.meta.url);

export class FuncionariosController {
  static async getfuncionario(req, res) {
    try {
      const funcionarios = await FuncionariosModel.findAll({
        order: [['id', 'ASC']],
        include: [
          { model: ParroquiaModel, as: "parroquia", attributes: ["descripcion"] },
          { model: GeneroModel, as: "genero", attributes: ["descripcion"] },
          { model: EstadoCivilModel, as: "estado_civil", attributes: ["descripcion"] },
          { model: EtniaModel, as: "etnia", attributes: ["descripcion"] },
          { model: CantonModel, as: "canton", attributes: ["descripcion"] },
          { model: TipoDiscapacidadModel, as: "tipo_discapacidad", attributes: ["descripcion"] },
          { model: GradoDiscapacidadModel, as: "grado_discapacidad", attributes: ["grado"] },

        ],
        distinct: true 
      });
      return res.status(200).json({ funcionarios });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getFuncionariosById(req, res) {
    try {
      const funcionarios = await FuncionariosModel.findByPk(req.params.id);
      if (!funcionarios) return res.status(404).json({ error: "No encontrado" });
      res.json(funcionarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Guardar nueva
  static async savefuncionario(req, res) {
    try {
      // Depuración: ver qué llega
      console.log('BODY:', req.body);
      console.log('FILE:', req.file);

      let {
        Numero_carnet_discapacidad,
        profesion,
        fecha_inicio_contrato,
        fecha_fin_contrato,
        residencia,
        tipo_discapacidad_id,
        grado_discapacidad_id,
        foto, // si llega como string
        ...resto
      } = req.body;

      // Procesar campos opcionales
      if (Numero_carnet_discapacidad === '' || Numero_carnet_discapacidad === undefined) Numero_carnet_discapacidad = null;
      if (profesion === '' || profesion === undefined) profesion = null;
      if (fecha_inicio_contrato === '' || fecha_inicio_contrato === undefined) fecha_inicio_contrato = null;
      if (fecha_fin_contrato === '' || fecha_fin_contrato === undefined) fecha_fin_contrato = null;
      if (residencia === '' || residencia === undefined) residencia = null;
      if (tipo_discapacidad_id === '' || tipo_discapacidad_id === undefined) tipo_discapacidad_id = null;
      if (grado_discapacidad_id === '' || grado_discapacidad_id === undefined) grado_discapacidad_id = null;

      // Procesar foto: si usas multer, req.file tendrá el archivo
      if (req.file) {
        foto = req.file.filename; // o req.file.path según tu config
      }
      // Si no hay foto, error (es obligatorio)
      if (!foto) {
        return res.status(400).json({ error: "El campo foto es obligatorio" });
      }

      const funcionarios = await FuncionariosModel.create({
        ...resto,
        Numero_carnet_discapacidad,
        profesion,
        fecha_inicio_contrato,
        fecha_fin_contrato,
        residencia,
        tipo_discapacidad_id,
        grado_discapacidad_id,
        foto,
      });
      res.status(201).json({ message: "Guardado correctamente", funcionarios });
    } catch (error) {
      res.status(500).json({ error: "Error al guardar", funcionarios: error.message });
    }
  }

  // Actualizar
  static async updatedfuncionario(req, res) {
    try {
      let {
        Numero_carnet_discapacidad,
        profesion,
        fecha_inicio_contrato,
        fecha_fin_contrato,
        residencia,
        tipo_discapacidad_id,
        grado_discapacidad_id,
        foto,
        ...resto
      } = req.body;

      if (Numero_carnet_discapacidad === '' || Numero_carnet_discapacidad === undefined) Numero_carnet_discapacidad = null;
      if (profesion === '' || profesion === undefined) profesion = null;
      if (fecha_inicio_contrato === '' || fecha_inicio_contrato === undefined) fecha_inicio_contrato = null;
      if (fecha_fin_contrato === '' || fecha_fin_contrato === undefined) fecha_fin_contrato = null;
      if (residencia === '' || residencia === undefined) residencia = null;
      if (tipo_discapacidad_id === '' || tipo_discapacidad_id === undefined) tipo_discapacidad_id = null;
      if (grado_discapacidad_id === '' || grado_discapacidad_id === undefined) grado_discapacidad_id = null;

      // Procesar foto si se actualiza
      if (req.file) {
        foto = req.file.filename;
      }

      const [updated] = await FuncionariosModel.update({
        ...resto,
        Numero_carnet_discapacidad,
        profesion,
        fecha_inicio_contrato,
        fecha_fin_contrato,
        residencia,
        tipo_discapacidad_id,
        grado_discapacidad_id,
        foto,
      }, {
        where: { id: req.params.id },
      });

      if (updated) {
        const updatedfuncionarios = await FuncionariosModel.findByPk(req.params.id);
        res.json({
          message: "Actualizada correctamente",
          funcionarios: updatedfuncionarios,
        });
      } else {
        res.status(404).json({ error: "No encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar", message: error.message });
    }
  }

  static async deleteFuncionario(req, res) {
    try {
      const deleted = await FuncionariosModel.destroy({
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
export const CantonController = {
  getCantones: async (req, res) => {
    try {
      const cantones = await CantonModel.findAll();
      res.json(cantones);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener cantones' });
    }
  },
  // ...otros métodos...
};