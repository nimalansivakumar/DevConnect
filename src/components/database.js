import fire from "./firebase";
const db = fire.firestore();
const storage = fire.storage();

export async function storeUserProfile(userProfile, ProfilePicture, user) {
  try {
    await db.collection(user.nickname).doc("profile").set(userProfile);

    if (ProfilePicture) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(ProfilePicture.name);
      imageRef.put(ProfilePicture).then(console.log("Image Uplaoded"));
    }
  } catch (err) {
    console.log(err);
  }
}
