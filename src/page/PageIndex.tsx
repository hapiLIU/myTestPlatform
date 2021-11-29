import React from 'react'
import { loginUser } from '../cookie/cookie'


export default function PageIndex() {
    const cookie = loginUser()
    return (
        <div>
            {cookie.loginUsername}
            index_page
        </div>
    )
}
