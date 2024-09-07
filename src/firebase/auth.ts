import { getAuth } from "firebase/auth";
import { app } from "./appFirebase";

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
