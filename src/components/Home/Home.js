import React from 'react';
import { Carousel, Card } from 'react-bootstrap';

const Home = () =>
{
    return (
        <div>
            <Carousel fade>
                <Carousel.Item style={{height: '700px'}}>
                    <img
                    style={{objectFit: 'cover', position: 'absolute',
                    top: '0',
                    left: '0',
                    minHeight: '300px'}}
                    className="d-block w-100"
                    src="https://cdn.pixabay.com/photo/2014/07/31/22/50/photographer-407068_1280.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Sign Up Today</h3>
                    <p>Create a free account and start creating Afects today!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{height: '700px'}}>
                    <img
                    className="d-block w-100"
                    src="https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017_1280.jpg"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>What are Afects?</h3>
                    <p>There your thoughts that you share with the world.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{height: '700px'}}>
                    <img
                    className="d-block w-100"
                    src="https://cdn.pixabay.com/photo/2016/03/09/09/43/person-1245959_1280.jpg"
                    alt="Third slide"
                    style={{objectFit: 'cover'}}
                    />

                    <Carousel.Caption>
                    <h3>Just Another Social Media Site?</h3>
                    <p>No, we are better! How? Sign up and find out.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Card className="bg-dark text-white" style={{height: "300px"}}>
                <Card.Img src="https://cdn.pixabay.com/photo/2020/10/04/09/57/bird-feather-5625806_1280.jpg" alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title>Share your AFects today</Card.Title>
                    <Card.Text>
                    Your thoughts can affect those around. Share positive and
                    additional content. This content is a little bit longer.
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                </Card.ImgOverlay>
            </Card>
        </div>
    )
}

export default Home;