import React from "react";
import { Card, CardBody, CardText, CardFooter, CardTitle } from 'react-bootstrap';
import './Reviews.css';
import Person1 from '../utils/img/person1.jpg';
import Person2 from '../utils/img/person2.jpg';
import Person3 from '../utils/img/person3.jpg';
import Person4 from '../utils/img/person4.jpg';

export function Reviews({ reviews }) {
    return (
        <div className="reviews-section container">
            <h2 className="text-center mb-5 text-uppercase fw-bold fs-1">Reviews</h2>
            <div className="row g-4">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div className="col-lg-6" key={index}>
                            <Card className="h-100 shadow">
                                <CardBody>
                                    <div className="p-4">
                                        <CardText>{review.comment}</CardText>
                                    </div>
                                </CardBody>
                                <CardFooter className="d-flex align-items-center">
                                    <img 
                                        src={Person1} // You might want to use different images or a default image
                                        className="img-fluid rounded-circle mx-3 shadow" 
                                        alt="Reviewer" 
                                    />
                                    <CardTitle className="text-success">{review.name}</CardTitle>
                                </CardFooter>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No reviews yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
