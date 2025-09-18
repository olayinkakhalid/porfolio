import React from 'react'
import { useState, useEffect } from 'react';
import './Body.css'
import github_icon from '../../assets/github-icon-1.svg'
import spotify_icon from '../../assets/spotify-2.svg'
import discord_icon from '../../assets/discord-6.svg'
import snapchat_icon from '../../assets/snapchat-logo-3.svg'
import educity from '../../assets/educity.png'
import eyah from '../../assets/eyah.png'
import metabnd from '../../assets/metabnd.png'
import whatsapp_icon from '../../assets/whatsapp.svg'


const Body = () => {

    const [status, setStatus] = useState("idle");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        const form = e.target;
        const data = new FormData(form);

        const response = await fetch("https://formspree.io/f/xldwyqrw", {
            method: "POST",
            body: data,
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            setStatus("success");
            form.reset();
        } else {
            setStatus("error");
        }
    };


    return (
        <div className='menu'>
            <div className="side-menu">
                <div className='header'>
                    <h1>Khalid Adewoye</h1>
                    <h2>Front End Engineer</h2>
                    <p>Building creative digital experiences <br /> with design, code, and innovation daily.</p>
                </div>

                <nav>
                    <ul>
                        <li >
                            <span class="line"></span>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <span class="line"></span>
                            <a href="#projects">Projects</a>
                        </li>
                        <li>
                            <span class="line"></span>
                            <a href="#skills">Skills</a>
                        </li>
                        <li>
                            <span class="line"></span>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </nav>

                <div className="links">
                    <a href="https://github.com/" target='_blank'><img src={github_icon} alt="Github" /></a>
                    <a href="https://www.whatsapp.com/" target='_blank'><img src={whatsapp_icon} alt="Wharsapp" /></a>
                   <a href="https://discord.com/" target='_blank'><img src={discord_icon} alt="Discord" /></a> 
                    <a href="https://www.snapchat.com/" target='_blank'><img src={snapchat_icon} alt="Snapchat" /></a>
                </div>
            </div>

            <div className="side-menu-2">
                <div id='about' className='about'>
                    <h2>About Me</h2>
                    <p>
                        I am a passionate and curious developer who enjoys building digital <br />
                        experiences that are both useful and engaging. My journey into <br />
                        technology began with a simple interest in how websites and applications <br />
                        work, which quickly grew into a desire to create my own. <br /> <br />
                    </p>

                    <p>
                        Starting with the basics of HTML, CSS, and JavaScript, I developed <br />
                        the ability to bring ideas to life on a screen. Over <br />
                        time, I moved into frameworks like React, where I discovered <br />
                        the power of interactivity and dynamic design. <br /> <br />
                    </p>

                    <p>
                        What drives me most is problem-solving. Every bug, challenge, or <br />
                        error is an opportunity to think critically, learn something new, <br />
                        and improve my craft. I’ve realized that building projects is <br />
                        more than just writing code, it’s about combining creativity with <br />
                        logic to design solutions that feel simple and natural for <br />
                        people to use. Clean structure and visual balance are just <br />
                        as important to me as functionality, which is why I <br />
                        pay attention to both design and detail. <br /> <br />
                    </p>

                    <p>
                        I believe in consistent growth and continuous learning. Whether through <br />
                        tutorials, real projects, or experimenting with new tools, I always <br />
                        push myself to expand my knowledge. Feedback plays a big role <br />
                        in this process — listening to others has helped me refine <br />
                        my skills and view problems from new perspectives. <br /> <br />
                    </p>

                    <p>
                        Beyond coding, I have a strong interest in how technology <br />
                        shapes our everyday lives. I enjoy exploring the intersection between <br />
                        design and innovation, and I see every project as a <br />
                        chance to contribute something meaningful. My long-term goal is to <br />
                        build applications and platforms that are not only functional but <br />
                        impactful, tools that make life easier and more connected. <br /> <br />
                    </p>

                    <p>
                        This portfolio is a reflection of my journey so far — <br />
                        the skills I’ve gained, the projects I’ve built, and the <br />
                        vision I’m working toward. I am excited about the future, <br />
                        open to collaboration, and ready to take on new challenges <br />
                        that push me forward as both a developer and a creator. <br />
                    </p>

                </div>


                <div id='projects' className='projects'>
                    <h2>My Project</h2>
                    <div className="uni-project">
                        <h1><a href="https://educity0.netlify.app/" target='_blank'>University Projects <span>↗</span></a></h1>
                        <div className="img-pro">
                            <img src={educity} alt="educity" />
                            <div className="polls">
                                <div className="labels">
                                    <div className='html'>HTML</div>
                                    <div className='css'>CSS</div>
                                    <div className='javascript'>JS</div>
                                </div>
                                <div className="polls-project">
                                    <div className="html-poll">
                                        <div className='html-poll-amount'></div>
                                    </div>

                                    <div className="css-poll">
                                        <div className='css-poll-amount'></div>
                                    </div>
                                    <div className="javascript-poll">
                                        <div className='javascript-poll-amount'></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>A clean and responsive university landing page designed to showcase programs, admissions, and campus life.</p>
                    </div>

                    <div className="uni-project">
                        <h1><a href="https://eyah.netlify.app/" target='_blank'>Eyah Project <span>↗</span></a></h1>
                        <div className="img-pro">
                            <img src={eyah} alt="eyah" />
                            <div className="polls">
                                <div className="labels">
                                    <div className='html'>HTML</div>
                                    <div className='css'>CSS</div>
                                    <div className='javascript'>React</div>
                                </div>
                                <div className="polls-project">
                                    <div className="html-poll">
                                        <div className='html-poll-amount-eyah'></div>
                                    </div>

                                    <div className="css-poll">
                                        <div className='css-poll-amount-eyah'></div>
                                    </div>
                                    <div className="javascript-poll">
                                        <div className='javascript-poll-amount-eyah'></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>The website features beautifully designed hover effects on its buttons, making interactions feel smooth, engaging, and visually appealing. Each button responds intuitively, enhancing the overall user experience.</p>
                    </div>

                    <div className="uni-project">
                        <h1><a href="https://enchantedmet.netlify.app/" target='_blank'>Metabnd Projects <span>↗</span> </a></h1>
                        <div className="img-pro">
                            <img src={metabnd} alt="metabnd" />
                            <div className="polls">
                                <div className="labels">
                                    <div className='html'>HTML</div>
                                    <div className='css'>CSS</div>
                                    <div className='javascript'>JS</div>
                                </div>
                                <div className="polls-project">
                                    <div className="html-poll">
                                        <div className='html-poll-amount-metabnd'></div>
                                    </div>

                                    <div className="css-poll">
                                        <div className='css-poll-amount-metabnd'></div>
                                    </div>
                                    <div className="javascript-poll">
                                        <div className='javascript-poll-amount-metabnd'></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>This landing page was created solely to test the hamburger menu functionality.</p>
                    </div>
                </div>


                <section className="skills" id="skills">
                    <div className="skills-container container">
                        <h2>My Skills</h2>
                        <div className="skill-card">
                            <div className="skill-info">
                                <span>HTML</span>
                                <div className="skill-bar">
                                    <div className="skill-fill html"></div>
                                </div>
                            </div>
                            <div className="skill-info">
                                <span>CSS</span>
                                <div className="skill-bar">
                                    <div className="skill-fill css"></div>
                                </div>
                            </div>
                            <div className="skill-info">
                                <span>JavaScript</span>
                                <div className="skill-bar">
                                    <div className="skill-fill js"></div>
                                </div>
                            </div>
                            <div className="skill-info">
                                <span>React</span>
                                <div className="skill-bar">
                                    <div className="skill-fill react"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section id="contact" className="contact">
                    <h2>Contact</h2>
                    <div className="contact-container">
                        <h2></h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Your Name' required  name='name'/>
                            <input type="email" placeholder='Your Email' required name='email' />
                            <textarea placeholder="Your Message" rows="5" required name='message'></textarea>
                            <button type="submit" disabled={status === "sending"}>Send Message</button>
                            {status === "sending" ? "Sending..." : "Submit now"}
                        </form>
                    </div>
                </section>

                <footer className="footer-note">
                    <p>
                        Crafted with care using modern web technologies. Developed with <a href="https://react.dev/">react.dev</a> and deployed seamlessly. All content styled with the Inter font for a clean and readable experience.
                    </p>
                </footer>

            </div>
        </div>
    )
}

export default Body