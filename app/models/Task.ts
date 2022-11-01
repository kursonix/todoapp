import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { setupRootStore } from "./helpers/setupRootStore"
import { User, UserModel } from "./User"

/**
 * Task model.
 */
export const TaskModel = types
  .model("Task")
  .props({
    id: types.identifier,
    task: "",
    date: new Date(),
    done: false,
    user: types.maybe(types.reference(types.late(() => UserModel))),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setTask(task: string) {
      self.task = task
    },
    setDate(date: Date) {
      self.date = date
    },
    setUser(user: User) {
      self.user = user
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Task extends Instance<typeof TaskModel> {}
export interface TaskSnapshotOut extends SnapshotOut<typeof TaskModel> {}
export interface TaskSnapshotIn extends SnapshotIn<typeof TaskModel> {}
export const createTaskDefaultModel = () => types.optional(TaskModel, {})
