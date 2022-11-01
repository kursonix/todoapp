import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase"
import { Task, TaskSnapshotIn, TaskSnapshotOut } from "../../models"

export class TaskService {
  async addTask(task: TaskSnapshotIn) {
    await addDoc(collection(db, "users", task.user.toString(), "tasks"), {
      ...task,
    })
  }

  async getTasks(userId: string): Promise<TaskSnapshotIn[]> {
    const tasks: TaskSnapshotIn[] = []
    const querySnapshot = await getDocs(collection(db, "users", userId, "tasks"))
    querySnapshot.forEach((doc) => {
      tasks.push({
        ...doc.data(),
        date: doc.data().date.toDate(),
        id: doc.id,
      } as TaskSnapshotIn)
    })
    return tasks
  }
}

export const taskService = new TaskService()
