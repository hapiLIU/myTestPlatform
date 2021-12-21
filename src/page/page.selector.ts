import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../cookie/store'
export const selectPage = (state: RootState) => state.page
export const selectUserList = createSelector(
    selectPage,
    (page) => page.userList
)
const exportObjects = {
    selectPage,
    selectUserList
}

export default exportObjects
