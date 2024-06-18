import React from 'react'
import { Alert, Button, Container } from 'react-bootstrap'

import NoticeList from './NoticeList'
import ContentList from './ContentList'

import NoticeData from '../../ToRemove/notice.json'
import ContentData from '../../ToRemove/content.json'

export default function Course() {
    return (
        <>
            <Container className='mt-2'>
                <Alert variant="info">
                    <h2>Course Name - Module Code</h2>
                </Alert>

                {/* Notice Component */}
                <NoticeList notices={NoticeData} />

                {/* Content Component */}
                <ContentList contents={ContentData} />

                <Button variant="danger">Unenroll this Module</Button>{' '}

            </Container>
        </>
    )
}
