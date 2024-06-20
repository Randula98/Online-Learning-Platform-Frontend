import React, { useState, useEffect } from 'react'
import { Alert, Row, Col, Button } from 'react-bootstrap';
import AnnouncementService from '../../services/Announcement.service';

export default function Announcements() {
    const [currentPage, setCurrentPage] = useState(1);
    const announcementsPerPage = 5;

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

    // Calculate the range of announcements to be displayed
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = AnnouncementList.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

    // Determine the number of pages needed
    const totalPages = Math.ceil(AnnouncementList.length / announcementsPerPage);

    return (
        <>
            <div className="d-flex justify-content-center mt-2">
                <div className="w-75">
                    <Alert variant="secondary">
                        <h3>Announcements</h3>
                    </Alert>

                    <div className="announcementRibbon">
                        {currentAnnouncements.map((announcement, index) => (
                            <Announcement key={index} timestamp={announcement.updatedOn} topic={announcement.topic} description={announcement.description} />
                        ))}
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
