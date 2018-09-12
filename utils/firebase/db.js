import firebase from "~/utils/firebase.js";
import "firebase/firestore";

export const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});
