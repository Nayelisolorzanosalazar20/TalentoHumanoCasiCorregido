import { Router } from "express";
import {CantonController} from '../Controllers/CantonController.js'
import {CapacitacionesController} from '../Controllers/capacitacionesController.js'
import {CargaFamiliarController} from '../Controllers/CargaFamiliarController.js'
import {ContactosController} from '../Controllers/ContactosController.js'
import {DocumentosController} from '../Controllers/DocumentosController.js'
import {EstadoCivilController} from '../Controllers/EstadoCivilController.js'
import {EtniaController} from '../Controllers/EtniaController.js'
import {FormacionAcademicaController} from '../Controllers/FormacionAcademicaController.js'
import {FuncionariosController} from '../Controllers/FuncionariosController.js'
import {GeneroController} from '../Controllers/GeneroController.js'
import {GradoDiscapacidadController} from '../Controllers/GradoDiscapacidadController.js'
import {InstitucionFinancieraController} from '../Controllers/InstitucionFinancieraController.js'
import {InformacionBancariaController} from '../Controllers/InformacionBancariaController.js'
import {ParroquiaController} from '../Controllers/ParroquiaController.js'
import {ProvinciaController} from '../Controllers/ProvinciaController.js'
import {TipoDiscapacidadController} from '../Controllers/TipoDiscapacidadController.js'
import {TipoDocumentoController} from '../Controllers/TipoDocumentoController.js'
import {TrayectoriaController} from '../Controllers/TrayectoriaController.js'
import { ParroquiaModel } from "../Models/ParroquiaModel.js";
import { InformacionBancariaModel } from "../Models/InformacionBancariaModel.js";
import { TrayectoriaModel } from "../Models/TrayectoriaModel.js";
import { ContactosModel } from "../Models/ContactosModel.js";
import { FormacionAcademicaModel } from "../Models/FormacionAcademicaModel.js";
import { DiscapacidadController } from '../Controllers/DiscapacidadController.js';
import { DiscapacidadModel } from "../Models/DiscapacidadModel.js";
import { CapacitacionesModel } from '../Models/CapacitacionesModel.js';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { TipoCuentaController } from '../Controllers/TipoCuentaController.js';
import { CargosController } from "../Controllers/CargosController.js";
import { UnidadController } from "../Controllers/UnidadController.js";
import { UnidadCargoController } from "../Controllers/UnidadCargoController.js";
import { CargoAsignadoController } from "../Controllers/CargoAsignadoController.js";
import { PeriodoController } from "../Controllers/PeridodoController.js";

const ApiRouter = express.Router();
// Configuración de almacenamiento de multer para capacitaciones
const storageCapacitaciones = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/capacitaciones/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now();
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  }
});
const uploadCapacitaciones = multer({ storage: storageCapacitaciones });


// Endpoint para subir archivos de capacitaciones
ApiRouter.post('/capacitaciones', uploadCapacitaciones.single('archivo'), async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'Archivo de capacitación requerido' });
    }

    const {
      descripcion,
      fecha_inicio,
      fecha_fin,
      n_horas,
      funcionario_id
    } = req.body;

    if (!descripcion || !fecha_inicio || !fecha_fin || !n_horas || !funcionario_id) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const data = await CapacitacionesModel.create({
      descripcion,
      fecha_inicio,
      fecha_fin,
      n_horas,
      funcionario_id,
      ruta_almacenamiento: req.file.filename
    });

    res.status(201).json(data);
  } catch (error) {
    console.error('Error al guardar capacitación:', error);
    res.status(500).json({ error: error.message });
  }
});
ApiRouter.patch('/capacitaciones/:id', uploadCapacitaciones.single('archivo'), async (req, res) => {
try {
    // Verifica que el archivo haya llegado
    if (!req.file) {
      return res.status(400).json({ error: 'Archivo de capacitación requerido' });
    }

    // Extrae los datos del body y del archivo
    const {
      descripcion,
      fecha_inicio,
      fecha_fin,
      n_horas,
      funcionario_id
    } = req.body;

    // Validación básica
    if (!descripcion || !fecha_inicio || !fecha_fin || !n_horas || !funcionario_id) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Crea la capacitación con la ruta del archivo
    const data = await CapacitacionesModel.create({
      descripcion,
      fecha_inicio,
      fecha_fin,
      n_horas,
      funcionario_id,
      ruta_almacenamiento: req.file.filename // o req.file.path si quieres la ruta completa
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  
  }
});
//------------------------------------------------------------------------------------------

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/documentos/');
  },
  filename: function (req, file, cb) {
        // Solo agrega un timestamp para que el nombre sea único
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now();
    cb(null, `${base}-${uniqueSuffix}${ext}`);
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Endpoint para guardar documento

// Importar el modelo de Documentos
import { Documentos } from '../db/Documentos.js';
// ...existing code...

ApiRouter.post('/documentos', upload.single('archivo'), async (req, res) => {
   console.log('Llega a POST /documentos');

  try {
    const { tipo_documento_id, funcionario_id } = req.body;
    const ruta_almacenamiento = req.file ? req.file.filename : null;
    
    


    if (!tipo_documento_id || !funcionario_id || !ruta_almacenamiento) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
    }

    await Documentos.create({
      ruta_almacenamiento,
      tipo_documento_id,
      funcionario_id
    });

    res.json({ mensaje: 'Documento guardado correctamente' ,
      ruta_almacenamiento 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar en la base de datos' });
  }
});


//------------------------------------------------------------------------------------------
ApiRouter.patch('/documentos/:id', upload.single('archivo'), async (req, res) => {
  try {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    const { tipo_documento_id, funcionario_id } = req.body;
    const ruta_almacenamiento = req.file ? req.file.filename : req.body.ruta_almacenamiento;

    // Validación
    if (!tipo_documento_id || !funcionario_id) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
    }

    // Actualiza el documento
    await Documentos.update(
      {
        ruta_almacenamiento,
        tipo_documento_id,
        funcionario_id
      },
      { where: { id: req.params.id } }
    );

    // Devuelve la ruta real del archivo actualizado
    res.json({
      mensaje: 'Documento actualizado correctamente',
      ruta_almacenamiento // <-- Esto es lo que necesita tu frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el documento' });
  }
});

//------------------FUNCIONARIOS ------------------------------------
// ...existing code...
const storageFotos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/funcionarios/');
  },
  filename: function (req, file, cb) {
    // Agrega timestamp para evitar sobrescribir archivos con el mismo nombre
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now();
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  }
});
const foto = multer({ storage: storageFotos });


//------------------------------------------------------------------------------------------
import { Funcionarios } from '../db/Funcionarios.js';
import { FuncionariosModel } from "../Models/FuncionariosModel.js";

ApiRouter.get('/funcionarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Asegúrate de que la relación esté definida en tu modelo
    const funcionario = await FuncionariosModel.findByPk(id, {
      include: [{ model: DiscapacidadModel }]
    });

    if (!funcionario) {
      return res.status(404).json({ mensaje: 'Funcionario no encontrado' });
    }

    // Siempre devuelve discapacidad como array
    res.json({
      ...funcionario.dataValues,
      discapacidad: funcionario.Discapacidad || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener funcionario' });
  }
});
ApiRouter.post('/funcionarios', foto.single('foto'), async (req, res) => {
  try {
    let { 
      nombres,
      apellidos,
      edad,
      DNI,
      nacionalidad,
      tipo_sangre,
      fecha_nacimiento,
      direccion,
      direccion_referencia,
      residencia,
      profesion,
      fecha_inicio_contrato,
      fecha_fin_contrato,
      Numero_carnet_discapacidad,
      genero_id,
      estado_civil_id,
      etnia_id,
      parroquia_id,
      tipo_discapacidad_id,
      grado_discapacidad_id,
      canton_id
     } = req.body;


      // Convierte campos opcionales vacíos a null
    if (residencia === '' || residencia === undefined) residencia = null;
    if (profesion === '' || profesion === undefined) profesion = null;
    if (fecha_inicio_contrato === '' || fecha_inicio_contrato === undefined) fecha_inicio_contrato = null;
    if (fecha_fin_contrato === '' || fecha_fin_contrato === undefined) fecha_fin_contrato = null;
    if (Numero_carnet_discapacidad === '' || Numero_carnet_discapacidad === undefined) Numero_carnet_discapacidad = null;
    if (tipo_discapacidad_id === '' || tipo_discapacidad_id === undefined) tipo_discapacidad_id = null;
    if (grado_discapacidad_id === '' || grado_discapacidad_id === undefined) grado_discapacidad_id = null;
     // Guarda solo el nombre del archivo, no la ruta completa
    const fotoNombre = req.file ? req.file.filename : null;
    const nombreOriginal = req.file ? req.file.originalname : null;


    // Valida los campos requeridos
    if (!nombres || !apellidos /* || ...otros campos requeridos */) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
    }

    const nuevoFuncionario = await Funcionarios.create({
      nombres,
      apellidos,
      edad,
      DNI,
      nacionalidad,
      tipo_sangre,
      fecha_nacimiento,
      direccion,
      direccion_referencia,
      residencia,
      profesion,
      fecha_inicio_contrato,
      fecha_fin_contrato,
      foto: fotoNombre, // Guarda solo el nombre del archivo
      nombre_original_foto: nombreOriginal, 
      Numero_carnet_discapacidad,
      genero_id,
      estado_civil_id,
      etnia_id,
      parroquia_id,
      tipo_discapacidad_id,
      grado_discapacidad_id,
      canton_id
    });

    // ... después de guardar o actualizar el funcionario ...

    const funcionarioId = nuevoFuncionario.id;

    // === GUARDAR TRAYECTORIAS LABORALES ===
    if ('trayectoria_laboral' in req.body) {
      let trayectoriasArray = [];
      try {
        trayectoriasArray = JSON.parse(req.body.trayectoria_laboral || '[]');
      } catch (e) {
        return res.status(400).json({ mensaje: 'trayectoria_laboral mal formada' });
      }
      for (const trayectoria of trayectoriasArray) {
        await TrayectoriaModel.create({
          ...trayectoria,
          funcionario_id: funcionarioId
        });
      }
    }
    
    //------------------------------------------------------------------------------------------

    // === GUARDAR INFORMACIÓN BANCARIA (opcional) ===
    if ('informacion_bancaria' in req.body) {
      let infoBancariaArray = [];
      try {
        infoBancariaArray = JSON.parse(req.body.informacion_bancaria || '[]');
      } catch (e) {
        return res.status(400).json({ mensaje: 'informacion_bancaria mal formada' });
      }
      for (const info of infoBancariaArray) {
  await InformacionBancariaModel.create({
    ...info,
    funcionario_id: funcionarioId,
    tipo_cuenta: info.tipo_cuenta_id // <-- Asegúrate de mapear el id al campo correcto
  });
}
    }

    // === GUARDAR CONTACTOS (opcional) ===
    if ('contactos' in req.body) {
      let contactosArray = [];
      try {
        contactosArray = JSON.parse(req.body.contactos || '[]');
      } catch (e) {
        return res.status(400).json({ mensaje: 'contactos mal formados' });
      }
      for (const contacto of contactosArray) {
        await ContactosModel.create({
          ...contacto,
          funcionario_id: funcionarioId
        });
      }
    }

    // === GUARDAR FORMACIÓN ACADÉMICA (opcional) ===
    if ('formacion_academica' in req.body) {
      let formacionArray = [];
      try {
        formacionArray = JSON.parse(req.body.formacion_academica || '[]');
      } catch (e) {
        return res.status(400).json({ mensaje: 'formacion_academica mal formada' });
      }
      for (const formacion of formacionArray) {
        await FormacionAcademicaModel.create({
          ...formacion,
          funcionario_id: funcionarioId
        });
      }
    }

    
if (req.body.discapacidad) {
  let discapacidadArray = [];
  try {
    discapacidadArray = JSON.parse(req.body.discapacidad || '[]');
  } catch (e) {
    return res.status(400).json({ mensaje: 'discapacidad mal formada' });
  }
  // Borra las discapacidades anteriores del funcionario
  await DiscapacidadModel.destroy({ where: { funcionario_id: funcionarioId } });
    console.log('Discapacidad recibida:', discapacidadArray); // <-- AGREGA ESTO

  // Inserta las nuevas discapacidades
  for (const discapacidad of discapacidadArray) {
    await DiscapacidadModel.create({
      ...discapacidad,
      funcionario_id: funcionarioId
    });
  }
}

    res.json({ mensaje: 'Funcionario guardado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar el funcionario' });
  }
});

//------------------------------------------------------------------------------------------
// PATCH para actualizar funcionario con foto
ApiRouter.patch('/funcionarios/:id', foto.single('foto'), async (req, res) => {
  try {
    let {
      nombres,
      apellidos,
      edad,
      DNI,
      nacionalidad,
      tipo_sangre,
      fecha_nacimiento,
      direccion,
      direccion_referencia,
      residencia,
      profesion,
      fecha_inicio_contrato,
      fecha_fin_contrato,
      Numero_carnet_discapacidad,
      genero_id,
      estado_civil_id,
      etnia_id,
      parroquia_id,
      tipo_discapacidad_id,
      grado_discapacidad_id,
      canton_id
    } = req.body;


    // Convierte campos opcionales vacíos a null
    if (residencia === '' || residencia === undefined) residencia = null;
    if (profesion === '' || profesion === undefined) profesion = null;
    if (fecha_inicio_contrato === '' || fecha_inicio_contrato === undefined) fecha_inicio_contrato = null;
    if (fecha_fin_contrato === '' || fecha_fin_contrato === undefined) fecha_fin_contrato = null;
    if (Numero_carnet_discapacidad === '' || Numero_carnet_discapacidad === undefined) Numero_carnet_discapacidad = null;
    if (tipo_discapacidad_id === '' || tipo_discapacidad_id === undefined) tipo_discapacidad_id = null;
    if (grado_discapacidad_id === '' || grado_discapacidad_id === undefined) grado_discapacidad_id = null;

    // Si se subió una nueva foto, usa el nombre del archivo, si no, usa el nombre anterior
    const fotoNombre = req.file ? req.file.filename :  req.body.foto;
    const nombreOriginal = req.file ? req.file.originalname : req.body.nombre_original_foto;



    // Valida los campos requeridos según tu lógica
    if (!nombres || !apellidos /* || ...otros campos requeridos */) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
    }

    await Funcionarios.update(
      {
        nombres,
        apellidos,
        edad,
        DNI,
        nacionalidad,
        tipo_sangre,
        fecha_nacimiento,
        direccion,
        direccion_referencia,
        residencia,
        profesion,
        fecha_inicio_contrato,
        fecha_fin_contrato,
        foto: fotoNombre, // Actualiza la foto
        nombre_original_foto: nombreOriginal, // <-- Actualiza el nombre original
        Numero_carnet_discapacidad,
        genero_id,
        estado_civil_id,
        etnia_id,
        parroquia_id,
        tipo_discapacidad_id,
        grado_discapacidad_id,
        canton_id
      },
      { where: { id: req.params.id } }
    );


    const funcionarioId = req.params.id;

    // === ACTUALIZA TRAYECTORIAS LABORALES SOLO SI LLEGAN ===
    if ('trayectoria_laboral' in req.body) {
      let trayectoriasArray = [];
      try {
        trayectoriasArray = JSON.parse(req.body.trayectoria_laboral || '[]');
      } catch (e) {
        return res.status(400).json({ mensaje: 'trayectoria_laboral mal formada' });
      }
      // Borra las trayectorias anteriores
      await TrayectoriaModel.destroy({ where: { funcionario_id: funcionarioId } });
      // Inserta las nuevas
      for (const trayectoria of trayectoriasArray) {
        await TrayectoriaModel.create({
          ...trayectoria,
          funcionario_id: funcionarioId
        });
      }
    }

    // === ACTUALIZA INFORMACIÓN BANCARIA SOLO SI LLEGA ===
    if ('informacion_bancaria' in req.body) {
      let infoBancariaArray = [];
      try {
        infoBancariaArray = JSON.parse(req.body.informacion_bancaria || '[]');
      } catch (e) {
        return res.status(400).json({ mensaje: 'informacion_bancaria mal formada' });
      }
      await InformacionBancariaModel.destroy({ where: { funcionario_id: funcionarioId } });
      for (const info of infoBancariaArray) {
        await InformacionBancariaModel.create({
          ...info,
          funcionario_id: funcionarioId,
          tipo_cuenta: info.tipo_cuenta_id,
        });
      }
    }

    // === ACTUALIZA CONTACTOS SOLO SI LLEGA ===
if ('contactos' in req.body) {
  let contactosArray = [];
  try {
    contactosArray = JSON.parse(req.body.contactos || '[]');
  } catch (e) {
    return res.status(400).json({ mensaje: 'contactos mal formados' });
  }
  await ContactosModel.destroy({ where: { funcionario_id: funcionarioId } });
  for (const contacto of contactosArray) {
    await ContactosModel.create({
      ...contacto,
      funcionario_id: funcionarioId
    });
  }
}

// === ACTUALIZA FORMACIÓN ACADÉMICA SOLO SI LLEGA ===
if ('formacion_academica' in req.body) {
  let formacionArray = [];
  try {
    formacionArray = JSON.parse(req.body.formacion_academica || '[]');
  } catch (e) {
    return res.status(400).json({ mensaje: 'formacion_academica mal formada' });
  }
  await FormacionAcademicaModel.destroy({ where: { funcionario_id: funcionarioId } });
  for (const formacion of formacionArray) {
    await FormacionAcademicaModel.create({
      ...formacion,
      funcionario_id: funcionarioId
    });
  }
}

if (req.body.discapacidad) {
  let discapacidadArray = [];
  try {
    discapacidadArray = JSON.parse(req.body.discapacidad || '[]');
  } catch (e) {
    return res.status(400).json({ mensaje: 'discapacidad mal formada' });
  }
  // Borra las discapacidades anteriores del funcionario
  await DiscapacidadModel.destroy({ where: { funcionario_id: funcionarioId } });
  // Inserta las nuevas discapacidades
  for (const discapacidad of discapacidadArray) {
    await DiscapacidadModel.create({
      ...discapacidad,
      funcionario_id: funcionarioId
    });
  }
}

  // <-- Agrega el cierre de la función PATCH aquí
  res.json({ mensaje: 'Funcionario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el funcionario' });
  }
});
  
//------------------------------------------------------------------------------------------
const ParroquiaModels = ParroquiaModel; // Asegúrate de que este modelo esté importado correctamente
ApiRouter.get('/parroquia/canton/:cantonId', async (req, res) => {
  const { cantonId } = req.params;
  try {
    const parroquias = await ParroquiaModels.findAll({ where: { canton_id: cantonId } });
    res.json(parroquias); // <-- SIEMPRE un array, aunque esté vacío
  } catch (error) {
    console.error(error);
    res.status(500).json([]); // <-- Devuelve array vacío en caso de error
  }
});
  
export { ApiRouter as ApiRouter };
//CANTON
ApiRouter.get('/canton', CantonController.getCantones);
ApiRouter.post('/canton', CantonController.saveCanton);
ApiRouter.patch('/canton/:id', CantonController.updatedCanton);
ApiRouter.delete('/canton/:id', CantonController.deleteCanton);
ApiRouter.get('/canton/:id', CantonController.getCantonById);

//CAPACITACIONES
ApiRouter.get('/capacitaciones', CapacitacionesController.getCapacitaciones);
ApiRouter.post('/capacitaciones', CapacitacionesController.createCapacitacion);
ApiRouter.patch('/capacitaciones/:id', CapacitacionesController.updateCapacitacion);
ApiRouter.delete('/capacitaciones/:id', CapacitacionesController.deleteCapacitacion);
ApiRouter.get('/capacitaciones/funcionario/:id', CapacitacionesController.getCapacitacionById);

//CARGA FAMILIAR
ApiRouter.get('/cargafamiliar', CargaFamiliarController.getCargasFamiliares);
ApiRouter.post('/cargafamiliar', CargaFamiliarController.createCargaFamiliar);
ApiRouter.patch('/cargafamiliar/:id', CargaFamiliarController.updateCargaFamiliar);
ApiRouter.delete('/cargafamiliar/:id', CargaFamiliarController.deleteCargaFamiliar);
ApiRouter.get('/cargafamiliar/:id', CargaFamiliarController.getCargaFamiliarById);

//CONTACTOS
ApiRouter.get('/contactos', ContactosController.getContactos);
ApiRouter.post('/contactos', ContactosController.createContacto);
ApiRouter.patch('/contactos/:id', ContactosController.updateContacto);
ApiRouter.delete('/contactos/:id', ContactosController.deleteContacto);
ApiRouter.get('/contactos/:id', ContactosController.getContactoById);

//DOCUMENTOS
ApiRouter.get('/uploads/documentos/:filename', (req, res) => {
  const filePath = path.join(process.cwd(), 'uploads', 'documentos', req.params.filename);
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ mensaje: 'Archivo no encontrado' });
    }
  });
});
ApiRouter.get('/documentos', DocumentosController.getDocumentos);
ApiRouter.post('/documentos', DocumentosController.createDocumento);
ApiRouter.patch('/documentos/:id', DocumentosController.updateDocumento);
ApiRouter.delete('/documentos/:id', DocumentosController.deleteDocumento);
ApiRouter.get('/documentos/:id', DocumentosController.getDocumentoById);

//ESTADO CIVIL
ApiRouter.get('/estado_civil', EstadoCivilController.getEstadosCiviles);
ApiRouter.post('/estado_civil', EstadoCivilController.saveEcivil);
ApiRouter.patch('/estado_civil/:id', EstadoCivilController.updateEcivil);
ApiRouter.delete('/estado_civil/:id', EstadoCivilController.deleteEstadoCivil);
ApiRouter.get('/estado_civil/:id', EstadoCivilController.getEstadosCivilesById);

//ETNIA
ApiRouter.get('/etnia', EtniaController.getEtnias);
ApiRouter.post('/etnia', EtniaController.saveEtnia);
ApiRouter.patch('/etnia/:id', EtniaController.updateEtnia);
ApiRouter.delete('/etnia/:id', EtniaController.deleteEtnia);
ApiRouter.get('/etnia/:id', EtniaController.getEtniaById);

//FORMACION ACADEMICA
ApiRouter.get('/formacionacademica', FormacionAcademicaController.getFormacionesAcademicas);
ApiRouter.post('/formacionacademica', FormacionAcademicaController.createFormacionAcademica);
ApiRouter.patch('/formacionacademica/:id', FormacionAcademicaController.updateFormacionAcademica);
ApiRouter.delete('/formacionacademica/:id', FormacionAcademicaController.deleteFormacionAcademica);
ApiRouter.get('/formacionacademica/:id', FormacionAcademicaController.getFormacionesAcademicasById);

//FUNCIONARIOS
ApiRouter.get('/funcionarios', FuncionariosController.getfuncionario);
ApiRouter.delete('/funcionarios/:id', FuncionariosController.deleteFuncionario);
ApiRouter.get('/funcionarios/:id', FuncionariosController.getFuncionariosById);

//GENERO
ApiRouter.get('/genero', GeneroController.getGeneros);
ApiRouter.post('/genero', GeneroController.saveGenero);
ApiRouter.patch('/genero/:id', GeneroController.updateGenero);
ApiRouter.delete('/genero/:id', GeneroController.deleteGenero);
ApiRouter.get('/genero/:id', GeneroController.getGeneroById);

//GRADO DE DISCAPACIDAD
ApiRouter.get('/grado_discapacidad', GradoDiscapacidadController.getGrado);
ApiRouter.post('/grado_discapacidad', GradoDiscapacidadController.saveGrado);
ApiRouter.patch('/grado_discapacidad/:id', GradoDiscapacidadController.updateGrado);
ApiRouter.delete('/grado_discapacidad/:id', GradoDiscapacidadController.deleteGrado);
ApiRouter.get('/grado_discapacidad/:id', GradoDiscapacidadController.getGradoById);

//INSTITUCION FINANCIERA
ApiRouter.get('/institucionfinanciera', InstitucionFinancieraController.getInstitucionesFinancieras);
ApiRouter.post('/institucionfinanciera', InstitucionFinancieraController.createInstitucionFinanciera);
ApiRouter.patch('/institucionfinanciera/:id', InstitucionFinancieraController.updateInstitucionFinanciera);
ApiRouter.delete('/institucionfinanciera/:id', InstitucionFinancieraController.deleteInstitucionFinanciera);
ApiRouter.get('/institucionfinanciera/:id', InstitucionFinancieraController.getInstitucionFinancieraById);

//INFORMACION FINANCIERA
ApiRouter.get('/informacionfinanciera', InformacionBancariaController.getInformacionBancaria);
ApiRouter.post('/informacionfinanciera', InformacionBancariaController.createInformacionBancaria);
ApiRouter.patch('/informacionfinanciera/:id', InformacionBancariaController.updateInformacionBancaria);
ApiRouter.delete('/informacionfinanciera/:id', InformacionBancariaController.deleteInformacionBancaria);
ApiRouter.get('/informacionfinanciera/:id', InformacionBancariaController.getInformacionBancariaById);

//PARROQUIA
ApiRouter.get('/parroquia', ParroquiaController.getParroquia);
ApiRouter.post('/parroquia', ParroquiaController.saveParroquia);
ApiRouter.patch('/parroquia/:id', ParroquiaController.updatedParroquia);
ApiRouter.delete('/parroquia/:id', ParroquiaController.deleteParroquia);
ApiRouter.get('/parroquia/:id', ParroquiaController.getParroquiaById);

//PROVINCIA
ApiRouter.get('/provincia', ProvinciaController.getProvincias);
ApiRouter.post('/provincia', ProvinciaController.saveProvincia);
ApiRouter.patch('/provincia/:id', ProvinciaController.updatedProvincia);
ApiRouter.delete('/provincia/:id', ProvinciaController.deleteProvincia);
ApiRouter.get('/provincia/:id', ProvinciaController.getProvinciaById);

//TIPO DE DISCAPACIDAD
ApiRouter.get('/tipo_discapacidad', TipoDiscapacidadController.getTipoDiscapacidad);
ApiRouter.post('/tipo_discapacidad', TipoDiscapacidadController.saveTDiscapacidad);
ApiRouter.patch('/tipo_discapacidad/:id', TipoDiscapacidadController.updateTDiscapacidad);
ApiRouter.delete('/tipo_discapacidad/:id', TipoDiscapacidadController.deleteTipoDiscapacidad);
ApiRouter.get('/tipo_discapacidad/:id', TipoDiscapacidadController.getTipoDiscapacidadById);

//TIPO DE DOCUMENTO
ApiRouter.get('/tipodocumento', TipoDocumentoController.getTiposDocumento);
ApiRouter.post('/tipodocumento', TipoDocumentoController.createTipoDocumento);
ApiRouter.patch('/tipodocumento/:id', TipoDocumentoController.updateTipoDocumento);
ApiRouter.delete('/tipodocumento/:id', TipoDocumentoController.deleteTipoDocumento);
ApiRouter.get('/tipodocumento/:id', TipoDocumentoController.getTipoDocumentoById);

//TRAYECTORIA
ApiRouter.get('/trayectoria', TrayectoriaController.getTrayectorias);
ApiRouter.post('/trayectoria', TrayectoriaController.createTrayectoria);
ApiRouter.patch('/trayectoria/:id', TrayectoriaController.updateTrayectoria);
ApiRouter.delete('/trayectoria/:id', TrayectoriaController.deleteTrayectoria);
ApiRouter.get('/trayectoria/:id', TrayectoriaController.getTrayectoriaById);


// DISCAPACIDAD
ApiRouter.get('/discapacidad', DiscapacidadController.getDiscapacidades);
// ...existing code...
ApiRouter.post('/discapacidad', async (req, res) => {
  
  try {
    // Aquí debes extraer los datos del body y guardarlos en la base de datos
    const { Numero_carnet_discapacidad, tipo_discapacidad_id, grado_discapacidad_id, funcionario_id } = req.body;
if (!Numero_carnet_discapacidad || !tipo_discapacidad_id || !grado_discapacidad_id || !funcionario_id) {
  return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
}
const nuevaDiscapacidad = await DiscapacidadModel.create({
  Numero_carnet_discapacidad,
  tipo_discapacidad_id,
  grado_discapacidad_id,
  funcionario_id
});
    res.json(nuevaDiscapacidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar discapacidad' });
  }
});

ApiRouter.patch('/discapacidad/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Numero_carnet_discapacidad, tipo_discapacidad_id, grado_discapacidad_id, funcionario_id } = req.body;

    // Validación básica
    if (!Numero_carnet_discapacidad || !tipo_discapacidad_id || !grado_discapacidad_id || !funcionario_id) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
    }

    const discapacidadActualizada = await DiscapacidadModel.findByIdAndUpdate(id, {
      Numero_carnet_discapacidad,
      tipo_discapacidad_id,
      grado_discapacidad_id,
      funcionario_id
    }, { new: true });

    if (!discapacidadActualizada) {
      return res.status(404).json({ mensaje: 'Discapacidad no encontrada' });
    }

    res.json(discapacidadActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar discapacidad' });
  }
});
ApiRouter.delete('/discapacidad/:id', DiscapacidadController.deleteDiscapacidad);
ApiRouter.get('/discapacidad/:id', DiscapacidadController.getDiscapacidadById);

// (Opcional: para obtener todas las discapacidades de un funcionario)
ApiRouter.get('/discapacidad/funcionario/:funcionario_id', DiscapacidadController.getDiscapacidadesByFuncionario);

// tipo de cuenta 
ApiRouter.get('/tipo_cuenta', TipoCuentaController.getTiposCuenta);
ApiRouter.post('/tipo_cuenta', TipoCuentaController.createTipoCuenta);
ApiRouter.patch('/tipo_cuenta/:id', TipoCuentaController.updateTipoCuenta);
ApiRouter.delete('/tipo_cuenta/:id', TipoCuentaController.deleteTipoCuenta);
ApiRouter.get('/tipo_cuenta/:id', TipoCuentaController.getTipoCuentaById);

//-----------------------------------------OTROS------------------------------------

// PERIODO

ApiRouter.get('/periodo', PeriodoController.getPeriodos);
ApiRouter.post('/periodo', PeriodoController.savePeriodo);
ApiRouter.patch('/periodo/:id', PeriodoController.updatePeriodo);
ApiRouter.delete('/periodo/:id', PeriodoController.deletePeriodo);
ApiRouter.get('/periodo/:id', PeriodoController.getPeriodoById);

// CARGOS

ApiRouter.get('/cargos', CargosController.getCargos);
ApiRouter.post('/cargos', CargosController.saveCargos);
ApiRouter.patch('/cargos/:id', CargosController.updateCargos);
ApiRouter.delete('/cargos/:id', CargosController.deleteCargos);
ApiRouter.get('/cargos/:id', CargosController.getCargosById);
// UNIDAD CARGOS 


ApiRouter.get('/unidad_cargos', UnidadCargoController.getUnidadCargo);
ApiRouter.post('/unidad_cargos', UnidadCargoController.createUnidadCargo);
ApiRouter.patch('/unidad_cargos/:id', UnidadCargoController.updateUnidadCargo);
ApiRouter.delete('/unidad_cargos/:id', UnidadCargoController.deleteUnidadCargo);
ApiRouter.get('/unidad_cargos/:id', UnidadCargoController.getUnidadCargoById);

//Unidad
ApiRouter.get('/unidad', UnidadController.getUnidad);
ApiRouter.post('/unidad', UnidadController.createUnidad);
ApiRouter.patch('/unidad/:id', UnidadController.updateUnidad);
ApiRouter.delete('/unidad/:id', UnidadController.deleteUnidad);
ApiRouter.get('/unidad/:id', UnidadController.getUnidadById);


//CARGO ASIGNADO 
ApiRouter.get('/cargo_asignado', CargoAsignadoController.getCargoAsignado);
ApiRouter.post('/cargo_asignado', CargoAsignadoController.createCargoAsignado);
ApiRouter.patch('/cargo_asignado/:id', CargoAsignadoController.updateCargoAsignado);
ApiRouter.delete('/cargo_asignado/:id', CargoAsignadoController.deleteCargoAsignado);
ApiRouter.get('/cargo_asignado/:id', CargoAsignadoController.getCargoAsignadoById);
