import React, { useState, useEffect } from 'react'
import { Alert, Row, Col } from 'react-bootstrap';

import AnnouncementService from '../../services/Announcement.service';

export default function Announcement({ size }) {
    const [AnnouncementList, setAnnouncementList] = useState([]);

    useEffect(() => {
        AnnouncementService.getAnnouncements()
            .then(response => {
                setAnnouncementList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function Announcement({ timestamp, topic, description }) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return (
            <Alert variant="light">
                <Row>
                    <Col xs={12} md={2}>
                        <div className="ansDate">
                            {formattedDate}
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
                            <Announcement key={index} timestamp={announcement.updatedOn} topic={announcement.topic} description={announcement.description} />
                        ))}
                        <a href="/announcements">See More...</a>
                    </div>
                </div>
            </div>
        </>
    )
}
