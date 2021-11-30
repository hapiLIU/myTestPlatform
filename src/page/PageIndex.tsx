import React from 'react'
import { LoginUser } from '../cookie/cookie'


export default function PageIndex() {
    const cookie = LoginUser()
    console.log(cookie)
    return (
        <div>
            index_page
        </div>
    )
}
