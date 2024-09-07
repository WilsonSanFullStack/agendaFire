import { getFirestore } from "firebase/firestore/lite";
import { app } from "./appFirebase";

export const DB = getFirestore(app);

