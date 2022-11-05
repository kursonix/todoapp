import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase"
import { CategorySnapshotIn } from "../../models/Category"

export class CategoryService {
  async addCategory(category: CategorySnapshotIn, userId: string) {
    const docRef = await addDoc(collection(db, "users", userId, "categories"), {
      ...category,
    })

    return docRef.id
  }

  async getCategories(userId: string) {
    const categories: CategorySnapshotIn[] = []
    const categoriesRef = collection(db, "users", userId, "categories")
    const querySnapshot = await getDocs(categoriesRef)
    querySnapshot.forEach((doc) => {
      categories.push({
        ...doc.data(),
        id: doc.id,
      } as CategorySnapshotIn)
    })
    return categories
  }

  async removeCategory(categoryId: string, userId: string) {
    await deleteDoc(doc(db, "users", userId, "categories", categoryId))
  }
}

export const categoryService = new CategoryService()
