

export type ErrorResponse = {
  message: string;
};

export const handleError = (error: unknown): ErrorResponse => {
  // Si es un error de la propia aplicación o un error desconocido
  if (error instanceof Error) {
    return {
      // status: error.code,
      message: error.message || "Ocurrió un error desconocido",
    };
  }

  // Si no es ningún tipo de error conocido
  return {
    message: "Error desconocido",
  };
};
