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
export const selectInforList = createSelector(
    selectPage,
    (page) => page.inforList
)
const exportObjects = {
    selectPage,
    selectUserList,
    selectAvatarList,
    selectInforList
}

export default exportObjects
