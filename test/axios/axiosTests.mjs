import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiHost = process.env.API_HOST || 'localhost';
const apiPort = process.env.API_PORT || 3000;

const axiosInstance = axios.create({
  baseURL: `http://${apiHost}:${apiPort}`,
  headers: { 'Content-Type': 'application/json' }
});

const room1 = {
  _id: '2b2b2b2b2b2b2b2b2b2b2b2b',
  numero: 2,
  tipo: 'familiar',
  descripcion: 'Habitación familiar, cama XL y literas, aseo con bañera',
  ultimaLimpieza: '2024-04-04T00:00:00.000Z',
  precio: 65.45,
  incidencias: [{
    descripcion: 'Descripción de prueba',
    _id: '65954723750cad27d2b508c0',
    inicio: '2024-04-04T00:00:00.000Z',
    fin: '2024-04-04T00:00:00.000Z'
  }],
  __v: 0
};

const room2 = {
  _id: '3c3c3c3c3c3c3c3c3c3c3c3c',
  numero: 3,
  tipo: 'individual',
  descripcion: 'Habitación individual, cama XS',
  ultimaLimpieza: '2024-04-04T00:00:00.000Z',
  precio: 65.45,
  __v: 0
};

const setToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Obtaining cleanings from a room
const getRoomCleanings = async (room) => {
  // Expected values
  const expectedValues = {
    status: 200,
    amount: 1
  };
  
  // Get cleanings
  try {
    const response = await axiosInstance.get(`/limpieza/${room._id}`);
    if (response.status === expectedValues.status && response.data.length >= expectedValues.amount) {
      console.log('OK - Limpiezas de habitación');
    } else {
      // Error message
      throw new Error(
        response.status !== expectedValues.status
          ? `Expected status: ${expectedValues.status} - Obtained: ${response.status}`
          : `Expected cleanings length: >= ${expectedValues.amount} - Obtained: ${response.data.length}`
      );
    }
  } catch (error) {
    console.log(`ERROR - Limpiezas de habitación - getRoomCleanings(${room})`);
    console.log('      -', error.message);
    if (error.response) {
      console.log('      -', error.response.data.message);
    }
    return -1;
  }
};

// Obtaining if a room is clean
const isRoomClean = async (room, expectedOk) => {
  // Expected values
  const expectedValues = {
    status: 200,
    ok: expectedOk
  };
  
  // Get room cleaning status
  try {
    const response = await axiosInstance.get(`/limpieza/limpia/${room._id}`);
    
    if (response.data.ok === expectedValues.ok && response.status === expectedValues.status) {
      // Custom message for OK based on expected value
      console.log('OK - Habitación', expectedValues.ok ? 'limpia' : 'sucia');
    } else {
      // Error message
      let error;
      if (response.status !== expectedValues.status) {
        error = `Expected status: ${expectedValues.status} - Obtained: ${response.status}`;
      } else if (response.status === 404) {
        error = 'Room not found';
      } else {
        error = `Expected clean: ${expectedValues.ok} - Obtained: ${response.data.ok}`;
      }
      throw new Error(error);
    }
  } catch (error) {
    console.log(`ERROR - Limpiezas de habitación - isRoomClean(${room})`);
    console.log('      -', error.message);
    if (error.response) {
      console.log('      -', error.response.data.message);
    }
    return -1;
  }
};

// Obtaining the list of rooms that have been cleaned today
const getCleanedRooms = async () => {
  // Expected values
  const expectedValues = {
    status: 200,
    amount: 1
  };
  
  // Get cleaned rooms
  try {
    const response = await axiosInstance.get('/limpieza/limpias');
    if (response.status === expectedValues.status && response.data.length === expectedValues.amount) {
      console.log('OK - Habitaciones limpiadas hoy');
      return response.data;
    } else {
      // Error message
      throw new Error(
        response.status !== expectedValues.status
          ? `Expected status: ${expectedValues.status} - Obtained: ${response.status}`
          : `Expected cleanings length: >= ${expectedValues.amount} - Obtained: ${response.data.length}`
      );
    }
  } catch (error) {
    console.log('ERROR - Habitaciones limpiadas hoy');
    console.log('      -', error.message);
    return -1;
  }
};

// Incorrect login
const incorrectLogin = async () => {
  // Expected values
  const expectedValues = {
    status: 401
  };
  
  // Login
  try {
    await axiosInstance.post('/auth/login', { login: 'admin', password: 'admin' });
    console.log('ERROR - Login incorrecto: se esperaba un error pero la petición fue exitosa');
    return -1;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('OK - Login incorrecto');
    } else {
      console.log('ERROR - Login incorrecto: se produjo un error inesperado');
      console.log('      -', error.message);
      return -1;
    }
  }
};

// Correct login
const correctLogin = async () => {
  // Expected values
  const expectedValues = {
    status: 201
  };
  
  // Login
  try {
    const response = await axiosInstance.post('/auth/login', { login: 'usuario1', password: 'password1' });
    if (response.status === expectedValues.status) {
      console.log('OK - Login correcto');
      return response.data.resultado;
    } else {
      throw new Error(`Status '${response.status}' inesperado`);
    }
  } catch (error) {
    console.log('ERROR - Login correcto');
    console.log('      -', error.message);
    return -1;
  }
};

// Insert cleaning WITHOUT correct login
const insertCleaningNoLogin = async () => {
  // Expected values
  const expectedValues = {
    status: 401
  };
  
  // Insert cleaning
  try {
    await axiosInstance.post('/limpieza', {
      habitacion: room1._id,
      fecha: Date.now()
    });
    console.log('ERROR - Inserción de limpieza sin login: se esperaba un error pero la petición fue exitosa');
    return -1;
  } catch (error) {
    if (error.response && error.response.status === expectedValues.status) {
      console.log('OK - Inserción de limpieza sin login');
    } else {
      console.log('ERROR - Inserción de limpieza sin login: se produjo un error inesperado');
      console.log('      -', error.message);
    }
  }
};

// Insert cleaning WITH correct login
const insertCleaning = async (token) => {
  setToken(token);
  // Expected values
  const expectedValues = {
    status: 201
  };
  
  // Insert cleaning
  try {
    const response = await axiosInstance.post('/limpieza', {
      habitacion: room1._id,
      fecha: '2023-03-03T15:15:15.000Z'
    });
    if (response.status === expectedValues.status) {
      console.log('OK - Inserción de limpieza con login');
      return response.data;
    } else {
      throw new Error('Unexpected status');
    }
  } catch (error) {
    console.log('ERROR - Inserción de limpieza con login');
    console.log('      -', error.message);
    if (error.response) {
      console.log('      -', error.response.data.message);
    }
  }
};

// Update cleaning WITHOUT correct login
const updateCleaningNoLogin = async () => {
  // Expected values
  const expectedValues = {
    status: 401
  };
  
  // Update cleaning
  try {
    await axiosInstance.patch('/limpieza/20012b2b2b2b2b2b2b2b2b2b', {
      habitacion: '2b2b2b2b2b2b2b2b2b2b2b2b',
      fecha: Date.now()
    });
    console.log('ERROR - Actualización de limpieza sin login: se esperaba un error pero la petición fue exitosa');
    return -1;
  } catch (error) {
    if (error.response && error.response.status === expectedValues.status) {
      console.log('OK - Actualización de limpieza sin login');
    } else {
      console.log('ERROR - Actualización de limpieza sin login: se produjo un error inesperado');
      console.log('      -', error.message);
      return -1;
    }
  }
};

// Update cleaning WITH correct login
const updateCleaning = async (token, cleaning) => {
  setToken(token);
  // Expected values
  const expectedValues = {
    status: 200
  };
  
  // Update cleaning
  try {
    const response = await axiosInstance.patch(`/limpieza/${cleaning._id}`, {
      fecha: new Date(Date.now()).toISOString()
    });
    if (response.status === expectedValues.status) {
      console.log('OK - Actualización de limpieza con login');
      return response.data;
    } else {
      throw new Error('Unexpected status');
    }
  } catch (error) {
    console.log('ERROR - Actualización de limpieza con login');
    console.log('      -', error.message);
    if (error.response) {
      console.log('      -', error.response.data.message);
    }
    return -1;
  }
};

const executeTests = async () => {
  // TODO: add tests
  const results = {
    succeededTests: 0,
    failedTests: 0
  };
  
  if (await insertCleaningNoLogin() === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  if (await updateCleaningNoLogin() === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  if (await incorrectLogin() === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  const token = await correctLogin();
  if (token === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  let cleaning = await insertCleaning(token);
  if (cleaning === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  cleaning = await updateCleaning(token, cleaning);
  if (cleaning === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  const cleanedRooms = await getCleanedRooms();
  if (cleanedRooms === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  if (await getRoomCleanings(room1) === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  if (await isRoomClean(room1, true) === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  if (await isRoomClean(room2, false) === -1) {
    results.failedTests++;
  } else {
    results.succeededTests++;
  }
  
  return results;
};

executeTests().then((results) => {
  console.log('Tests finalizados');
  console.log(`Tests exitosos: ${results.succeededTests}`);
  console.log(`Tests fallidos: ${results.failedTests}`);
});
