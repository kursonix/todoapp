import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CategoryStoreModel } from "./CategoryStore"
import { TaskStoreModel } from "./TaskStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  categoryStore: types.optional(CategoryStoreModel, {} as any),
  taskStore: types.optional(TaskStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
