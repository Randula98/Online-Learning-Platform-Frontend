import React from 'react'
import { Alert } from 'react-bootstrap'

export default function NoticeList({ notices }) {
  return (
    <div>
      <h3>Notices</h3>
      <ul>
        {notices.map((notice, index) => (
          <Alert variant="secondary" key={index}>
            <Alert.Heading>{notice.topic}</Alert.Heading>
            <hr />
            <p className="mb-0">
              {notice.description}
            </p>
          </Alert>
        ))}
      </ul>

    </div>
  )
}
