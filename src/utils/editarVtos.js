import Swal from "sweetalert2";

const editarVtos = async (vtosActualizados, actualizarVtosenBack) => {
  try {
    const response = await actualizarVtosenBack(vtosActualizados);
    if (response.success) {
      Swal.fire("Éxito", "El producto se actualizó correctamente", "success");
      return { success: true };
    } else {
      Swal.fire("Error", response.message || "No se pudo actualizar", "error");
      return { success: false };
    }
  } catch (error) {
    Swal.fire("Error", "Hubo un problema al actualizar",error);
    return { success: false };
  }
};

export default editarVtos;
