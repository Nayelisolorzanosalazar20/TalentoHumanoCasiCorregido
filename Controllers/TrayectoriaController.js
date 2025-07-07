import { TrayectoriaModel } from '../Models/TrayectoriaModel.js';
import { createRequire } from 'node:module';
import { FuncionariosModel } from '../Models/FuncionariosModel.js'; // Asegúrate de importar el modelo de Funcionarios
const req = createRequire(import.meta.url);

export class TrayectoriaController{

static async createTrayectoria(req, res){
  try {
    const data = await TrayectoriaModel.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async getTrayectorias(req, res){
  try {
    const data = await TrayectoriaModel.findAll({
      order: [['id', 'ASC']],
              include: [{ model: FuncionariosModel, as: 'funcionarios' }]
            });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async getTrayectoriaById(req, res){
  try {
    const data = await TrayectoriaModel.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: 'No encontrado' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async updateTrayectoria(req, res){
  try {
    const [updated] = await TrayectoriaModel.update(req.body, { where: { id: req.params.id } });
    updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async deleteTrayectoria(req, res){
  try {
    const deleted = await TrayectoriaModel.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

}



