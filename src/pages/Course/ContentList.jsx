import React from 'react'
import { Alert, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import the specific icons you need
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export default function ContentList({ contents }) {
    return (
        <div>
            <h3>Module Content</h3>
            <ul>
                {contents.map((content, index) => (
                    <Alert variant="light" key={index}>
                        <Alert.Heading>{content.week} - {content.topic}</Alert.Heading>
                        <hr />
                        <p className="mb-0">
                            {content.fileurl && (
                                <Button variant="secondary" target='_blank' href={content.fileurl}>
                                    Get Lecture Slides
                                </Button>
                            )}
                            {content.fileurl && content.recordingUrl && (
                                <>&nbsp; &nbsp;</>
                            )}
                            {content.recordingUrl && (
                                <Button variant="primary" target='_blank' href={content.recordingUrl}>
                                    View Lecture Recording
                                </Button>
                            )}
                        </p>
                    </Alert>
                ))}

            </ul>
        </div>
    )
}
