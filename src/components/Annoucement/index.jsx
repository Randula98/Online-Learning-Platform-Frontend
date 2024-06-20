import React from 'react'
import { Alert, Row, Col } from 'react-bootstrap';

import AnnouncementList from "../../ToRemove/announcement.json";

export default function Announcement({ size }) {

    function Announcement({ date, topic, description }) {
        return (
            <Alert variant="light">
                <Row>
                    <Col xs={12} md={2}>
                        <div className="ansDate">
                            {date}
                        </div>
                    </Col>
                    <Col xs={12} md={10}>
                        <div className="ansText">
                            <h5>{topic}</h5>
                            {description}
                        </div>
                    </Col>
                </Row>
            </Alert>
        )
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="w-75">
                    <Alert variant="secondary">
                        <h3>Announcements</h3>
                    </Alert>

                    <div className="announcementRibbon">
                        {AnnouncementList.slice(0, size).map((announcement, index) => (
                            <Announcement key={index} date={announcement.date} topic={announcement.topic} description={announcement.description} />
                        ))
                        }
                        See More ...
                    </div>
                </div>
            </div>
        </>
    )
}
