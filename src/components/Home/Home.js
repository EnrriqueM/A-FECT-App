import React from 'react';
import { Carousel } from 'react-bootstrap';

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
                    src="https://pixabay.com/get/g8bff3ef8541d5d3d22e8e3163c25c9dc9b126bd4608f28701212a2047a479cf12f64f232ba7a3a76ee3e9348e908de00_1920.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{height: '700px'}}>
                    <img
                    className="d-block w-100"
                    src="https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017_1280.jpg"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Home;