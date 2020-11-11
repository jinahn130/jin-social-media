import React from 'react'
import './intro.css'

function intro() {
    return (
        <div className="intro_container">
            <div className="intro_header">
                <span>Welcome to my Social Media Application!</span>
                <div className="profileImageContainer">
                    <img src="https://i.ibb.co/RcSccFw/me.jpg" alt="me"/>
                </div>
            </div>
            <div className="cardBody">
                <p className="personalBio"> My name is Jin Seong Ahn and I am a student at the University of Washington. My interests are in web development and embedded systems programming. </p>
                <p className="personalBio"> I used React.js and Firebase to construct the website. You need to sign up with your email to post images and comment on the posts. You can only delete your own posts! </p>
            </div>
            
            <div className="intro_header">
                <span>Social Networks</span>
                <div className="socialPic" >
                    <a href='https://www.facebook.com/jin.s.ahn/'>
                        <svg class="svg-icon" viewBox="0 0 20 20">
                                <path fill="none" d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"></path>
                        </svg>
                    </a>

                    <a href='https://www.instagram.com/jinahn125/'>
                        <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M14.52,2.469H5.482c-1.664,0-3.013,1.349-3.013,3.013v9.038c0,1.662,1.349,3.012,3.013,3.012h9.038c1.662,0,3.012-1.35,3.012-3.012V5.482C17.531,3.818,16.182,2.469,14.52,2.469 M13.012,4.729h2.26v2.259h-2.26V4.729z M10,6.988c1.664,0,3.012,1.349,3.012,3.012c0,1.664-1.348,3.013-3.012,3.013c-1.664,0-3.012-1.349-3.012-3.013C6.988,8.336,8.336,6.988,10,6.988 M16.025,14.52c0,0.831-0.676,1.506-1.506,1.506H5.482c-0.831,0-1.507-0.675-1.507-1.506V9.247h1.583C5.516,9.494,5.482,9.743,5.482,10c0,2.497,2.023,4.52,4.518,4.52c2.494,0,4.52-2.022,4.52-4.52c0-0.257-0.035-0.506-0.076-0.753h1.582V14.52z"></path>
						</svg>
                    </a>

                    <a href='https://www.linkedin.com/in/jin-seong-ahn-089564177/'>
                       <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M18.378,1.062H3.855c-0.309,0-0.559,0.25-0.559,0.559c0,0.309,0.25,0.559,0.559,0.559h13.964v13.964
								c0,0.309,0.25,0.559,0.559,0.559c0.31,0,0.56-0.25,0.56-0.559V1.621C18.938,1.312,18.688,1.062,18.378,1.062z M16.144,3.296H1.621
								c-0.309,0-0.559,0.25-0.559,0.559v14.523c0,0.31,0.25,0.56,0.559,0.56h14.523c0.309,0,0.559-0.25,0.559-0.56V3.855
								C16.702,3.546,16.452,3.296,16.144,3.296z M15.586,17.262c0,0.31-0.25,0.558-0.56,0.558H2.738c-0.309,0-0.559-0.248-0.559-0.558
								V4.972c0-0.309,0.25-0.559,0.559-0.559h12.289c0.31,0,0.56,0.25,0.56,0.559V17.262z"></path>
						</svg>
                    </a>                   
                </div>
            
            </div>
        </div>
    )
}

export default intro
