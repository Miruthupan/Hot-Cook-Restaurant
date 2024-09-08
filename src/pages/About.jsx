import React from 'react';
import './About.css';
import AboutChef1 from '../utils/img/about-chef1.jpg';
import AboutChef2 from '../utils/img/about-chef2.jpg';
import { ImageGallery } from '../components/ImageGallery';
import { Reviews } from '../components/Reviews';

const  About = () => {
    return (
        <div className='about-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>About</h1>
                </div>
            </header>

            <div className='container my-5'>
                <p>At HOT COOK RESTAURANT, we believe that every meal should be a celebration of flavor and togetherness. Our restaurant is dedicated to creating an extraordinary dining experience by combining the best of traditional and modern culinary arts. We pride ourselves on delivering not just exceptional food but also a welcoming environment where every guest feels at home.</p>
                <p>Our journey began with a simple yet powerful vision: to share our love for exquisite cuisine with the community. Our talented chefs, each with years of expertise, are passionate about crafting dishes that delight and satisfy. From our time-honored favorites to innovative new creations, we use only the freshest, locally-sourced ingredients to ensure every bite is a taste of excellence.</p>

                <div className='row'>
                    <div className='col-lg-6'>
                        <img src={AboutChef1} className='img-fluid my-4' alt="" />
                    </div>
                    <div className='col-lg-6'>
                        <img src={AboutChef2} className='img-fluid my-4' alt="" />
                    </div>
                </div>

                <p>At HOT COOK RESTAURANT, we hold ourselves to the highest standards of quality and service. Our team is devoted to providing a warm, attentive dining experience, ensuring that every visit is as enjoyable as it is memorable. We’re also committed to sustainability, implementing eco-friendly practices to minimize our environmental footprint.

Come and experience the unique fusion of great food, friendly service, and a cozy ambiance at HOT COOK RESTAURANT. Whether you're joining us for a casual meal or a special occasion, we're here to make your dining experience extraordinary.</p>
            </div>

            <div className='bg-dark text-light'>
                <ImageGallery />
            </div>

            {/* <div className='my-5'>
                <Reviews />
            </div> */}
        </div>
    )
}

export default About;