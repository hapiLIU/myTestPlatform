import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../cookie/store'
export const selectPage = (state: RootState) => state.page
export const selectUserList = createSelector(
    selectPage,
    (page) => page.userList
)
export const selectAvatarList = createSelector(
    selectPage,
    (page) => page.avatarList
)
const exportObjects = {
    selectPage,
    selectUserList,
    selectAvatarList
}

export default exportObjects
