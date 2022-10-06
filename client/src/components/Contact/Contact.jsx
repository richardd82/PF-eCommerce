import emailjs from '@emailjs/browser';
import React from 'react';
import './contact.css';

export default function Contact() {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm('service_kjjpo9p', 'template_rnler4m', e.target, 'RxMLXG9tmltkvFJpW')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return(
        <div>
            <div className="container">
            <form onSubmit={sendEmail}>
                    <div className="field">
                        <div className="field">
                            <input type="text" className="form-control" placeholder="Name" name="name"/>
                        </div>
                        <div className="field">
                            <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                        </div>
                        <div className="field">
                            <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="field">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="field">
                            <input type="submit" className="btn btn-info" value="Send Message"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
