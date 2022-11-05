import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
  getSnapshot,
  destroy,
  flow,
} from "mobx-state-tree"
import { taskService } from "../services/firebase/taskService"
import { Task, TaskModel, TaskSnapshotIn } from "./Task"
import uuid from "react-native-uuid"
import { v1 as uuidv1, v4 as uuidv4, v3 as uuidv3, v5 as uuidv5 } from "uuid"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { values } from "mobx"
import { endOfDay, startOfDay } from "date-fns"

/**
 * Task collections.
 */
export const TaskStoreModel = types
  .model("TaskStore")
  .props({
    tasks: types.array(TaskModel),
  })
  .views((self) => ({
    filterTasksByDate(date: Date) {
      const tasks = self.tasks.filter(
        (todo) => todo.date >= startOfDay(date) && todo.date <= endOfDay(date),
      )
      return tasks
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async loadTasks(userId: string, date: Date) {
      const tasks = await taskService.getTasks(userId, date)
      self.setProp("tasks", tasks)
    },
  }))
  .actions((self) => ({
    addTask: flow(function* addTask(task: TaskSnapshotIn) {
      const taskId = yield taskService.addTask(task)
      self.tasks.push({ id: taskId, ...task })
    }),
    removeTask: flow(function* removeTask(taskId: string) {
      const task = self.tasks.find((ele) => ele.id === taskId)
      yield taskService.removeTask(task)
      destroy(task)
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface TaskStore extends Instance<typeof TaskStoreModel> {}
export interface TaskStoreSnapshotOut extends SnapshotOut<typeof TaskStoreModel> {}
export interface TaskStoreSnapshotIn extends SnapshotIn<typeof TaskStoreModel> {}
export const createTaskStoreDefaultModel = () => types.optional(TaskStoreModel, {})
