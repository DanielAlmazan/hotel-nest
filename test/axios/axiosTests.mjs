console.log("Holi");
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json"
  }
});

const setToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const executeTests = async () => {
  // TODO: add tests
  await getRoomCleanings("2b2b2b2b2b2b2b2b2b2b2b2b");
  await isRoomClean("2b2b2b2b2b2b2b2b2b2b2b2b");
};

// Obtaining cleanings from a room
const getRoomCleanings = async (roomId) => {
  // Expected values
  const expectedValues = {
    status: 200,
    length: 8
  };
  
  // Get cleanings
  try {
    const response = await axiosInstance.get(
      `/limpiezas/${roomId}`
    );
    if (
      response.status === expectedValues.status &&
      response.data.resultado.length === expectedValues.length
    ) {
      console.log("OK - Limpiezas de habitación");
    } else {
      // Error message
      throw new Error(response.status !== expectedValues.status
        ? `Expected status: ${expectedValues.status} - Obtained: ${response.status}`
        : `Expected cleanings length: ${expectedValues.length} - Obtained: ${response.data.resultado.length}`);
    }
  } catch (error) {
    console.log(`ERROR - Limpiezas de habitación - getRoomCleanings(${roomId})`);
    console.log('      -', error.message);
  }
};

// Obtaining if a room is clean or not
const isRoomClean = async (roomId) => {
  // Expected values
  const expectedValues = {
    status: 200,
    clean: true
  }
  
  // Get room cleaning status
  try {
    const response = await axiosInstance.get(`/limpiezas/limpia/${roomId}`);
    
    if (response.status === expectedValues.status && response.data.resultado.limpia === expectedValues.clean) {
      console.log("OK - Habitación limpia");
    } else {
      // Error message
      let error;
      if (response.status !== expectedValues.status) {
        error = `Expected status: ${expectedValues.status} - Obtained: ${response.status}`;
      } else if (response.status === 404) {
        error = 'Room not found';
      } else {
        error = `Expected clean: ${expectedValues.clean} - Obtained: ${response.data.resultado.limpia}`;
      }
      throw new Error(error);
    }
  } catch (error) {
    console.log(`ERROR - Limpiezas de habitación - isRoomClean(${roomId})`);
    console.log('      -', error.message);
  }
};
// Obtener el listado de habitaciones que se han limpiado el día de hoy
// Login correcto
// Login incorrecto
// Insertar limpieza SIN login correcto
// Insertar limpieza CON login correcto
// Actualizar limpieza SIN login correcto
// Actualizar limpieza CON login correcto

executeTests().then(() => console.log("Tests finalizados"));
