import { CargaFamiliarModel } from "../Models/CargaFamiliarModel.js";
import { createRequire } from 'node:module';
import { FuncionariosModel } from "../Models/FuncionariosModel.js";
const req = createRequire(import.meta.url);

export class CargaFamiliarController{

  static async getCargasFamiliares(req,res){
    try {
      const cargaFamiliar = await CargaFamiliarModel.findAll({
            order: [['id', 'ASC']],
        include: [
                {
                      model: FuncionariosModel,
                       as: "funcionarios", // Usa el alias correcto
                       attributes: ['nombres', 'apellidos'], // Asegúrate de incluir los atributos que necesitas
                }
              ],})
      res.json(cargaFamiliar);
    } catch (error) {
      console.log(error); 
      res.status(500).json({ error: "Error al obtener cargas familiares" });
    }
  }


    static async getCargaFamiliarById(req, res){
      try {
        const cargaFamiliar = await CargaFamiliarModel.findByPk(req.params.id);
        if (!cargaFamiliar) return res.status(404).json({ error: 'No encontrado' });
        res.json(cargaFamiliar);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

  static async createCargaFamiliar(req,res){
    try {
        console.log('Body recibido en carga familiar:', req.body);

    if (!req.body.funcionario_id || isNaN(Number(req.body.funcionario_id))) {
      return res.status(400).json({ mensaje: 'funcionario_id inválido' });
    }

       // Validar que el funcionario exista
    const funcionario = await FuncionariosModel.findByPk(req.body.funcionario_id);
    if (!funcionario) {
      return res.status(400).json({ mensaje: 'El funcionario_id no existe' });
    }
    console.log('Objeto a guardar:', {
  nombre_persona: req.body.nombre_persona,
  cedula: req.body.cedula,
  nivel_educativo: req.body.nivel_educativo,
  parentesco: req.body.parentesco,
  funcionario_id: req.body.funcionario_id
});


// ...existing code...
const cargaFamiliar = await CargaFamiliarModel.create({
  nombre_persona: req.body.nombre_persona,
  cedula: req.body.cedula,
  nivel_educativo: req.body.nivel_educativo,
  parentesco: req.body.parentesco,
  funcionario_id: Number(req.body.funcionario_id)
});
// ...existing code...
      res.status(201).json(cargaFamiliar);
    } catch (error) {
      console.error('Error al crear carga familiar:', error);
      res.status(500).json({ error: error.message, detalle: error  });
    }
  }


  // Guardar nueva carga familiar
  static async updateCargaFamiliar(req,res){
    try {
      const [updated] = await CargaFamiliarModel.update(req.body, { where: { id: req.params.id } });
      updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Eliminar carga familiar

    static async deleteCargaFamiliar(req, res) {
      try {
        const cargaFamiliar = await CargaFamiliarModel.findByPk(req.params.id);
        if (!cargaFamiliar) return res.status(404).json({ message: "No encontrado" });
        await cargaFamiliar.destroy();
        res.json({ message: "Eliminado correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

}



