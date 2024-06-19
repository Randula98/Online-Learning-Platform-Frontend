import React from 'react'
import { Alert, Button, Container } from 'react-bootstrap'

import AdminNoticeList from './AdminNoticeList'
import AdminContentList from './AdminContentList'

import NoticeData from '../../ToRemove/notice.json'
import ContentData from '../../ToRemove/content.json'


export default function AdminCourse() {
    return (
        <>
            <Container className='mt-2'>
                <Alert variant="info">
                    <h2>Course Name - Module Code</h2>
                </Alert>
                {/* Notice Component */}
                <AdminNoticeList notices={NoticeData} />
                {/* Content Component */}
                <AdminContentList contents={ContentData} />
            </Container>
        </>
    )
}
