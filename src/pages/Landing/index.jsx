import React from 'react'

import Slider from './Slider'
import { Announcement } from '../../components'

export default function Landing() {
    return (
        <>
            <Slider />
            <br />
            <Announcement size={4} />
        </>
    )
}
