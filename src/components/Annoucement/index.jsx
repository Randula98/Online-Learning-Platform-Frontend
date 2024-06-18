import React from 'react'
import {Alert, Row, Col } from 'react-bootstrap';

export default function Announcement() {

    function Announcement() {
        return (
            <Alert variant="light">
            <Row>
                <Col xs={12} md={2}>
                    <div className="ansDate">
                        Date
                    </div>
                </Col>
                <Col xs={12} md={10}>
                    <div className="ansText">
                        Description
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
                        <Announcement/>
                        <Announcement/>
                        <Announcement/>
                        <Announcement/>
                    See More ...
                    </div>
                </div>
            </div>

        </>
    )
}
