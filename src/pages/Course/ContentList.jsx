import React from 'react'
import { Alert, Button } from 'react-bootstrap'

export default function ContentList({ contents }) {
    return (
        <div>
            <h3>Module Content</h3>
            <ul>
                {contents && (
                    contents.map((content, index) => (
                        <Alert variant="light" key={index}>
                            <Alert.Heading>{content.week} - {content.topic}</Alert.Heading>
                            <hr />
                            <p className="mb-0">
                                {content.fileUrl && (
                                    <Button variant="secondary" target='_blank' href={content.fileUrl}>
                                        Get Lecture Slides
                                    </Button>
                                )}
                                {content.fileUrl && content.recordingUrl && (
                                    <>&nbsp; &nbsp;</>
                                )}
                                {content.recordingUrl && (
                                    <Button variant="primary" target='_blank' href={content.recordingUrl}>
                                        View Lecture Recording
                                    </Button>
                                )}
                            </p>
                        </Alert>
                    ))
                )}


            </ul>
        </div>
    )
}
