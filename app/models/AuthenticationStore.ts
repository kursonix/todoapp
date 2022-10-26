import { User } from "firebase/auth"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "./User"

/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    user: types.maybe(UserModel),
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!self.user
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setUser(user: User) {
      self.user = UserModel.create({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        refreshToken: user.refreshToken,
      })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotOut
  extends SnapshotOut<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotIn
  extends SnapshotIn<typeof AuthenticationStoreModel> {}
export const createAuthenticationStoreDefaultModel = () =>
  types.optional(AuthenticationStoreModel, {})
