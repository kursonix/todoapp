import { Instance, SnapshotIn, SnapshotOut, types, getSnapshot } from "mobx-state-tree"
import { taskService } from "../services/firebase/taskService"
import { TaskModel, TaskSnapshotIn } from "./Task"
import uuid from "react-native-uuid"
import { v1 as uuidv1, v4 as uuidv4, v3 as uuidv3, v5 as uuidv5 } from "uuid"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Task collections.
 */
export const TaskStoreModel = types
  .model("TaskStore")
  .props({
    tasks: types.array(TaskModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async loadTasks(userId: string) {
      const tasks = await taskService.getTasks(userId)
      self.setProp("tasks", tasks)
    },
  }))
  .actions((self) => ({
    async addTask(task: TaskSnapshotIn) {
      await taskService.addTask({
        id: uuidv4(),
        ...task,
      })
      self.loadTasks(task.user.toString())
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface TaskStore extends Instance<typeof TaskStoreModel> {}
export interface TaskStoreSnapshotOut extends SnapshotOut<typeof TaskStoreModel> {}
export interface TaskStoreSnapshotIn extends SnapshotIn<typeof TaskStoreModel> {}
export const createTaskStoreDefaultModel = () => types.optional(TaskStoreModel, {})
