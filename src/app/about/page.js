import React from 'react';
import AshleyPic from '../../../public/images/profile/Ashley.png';
import Image from 'next/image';
import Link from 'next/link';
import TransitionEffect from '@/components/TransitionEffect';

export const metadata = {
  title: 'About',
  description: 'About Me',
};

export default function About() {
  return (
    <>
      <TransitionEffect />
      <main>
        <div>
          <article className="resume-wrapper text-center position-relative">
            <div className="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
              <header className="resume-header pt-4 pt-md-0">
                <div className="media flex-column flex-md-row">
                  <Image className="mr-3 img-fluid picture mx-auto" src={AshleyPic} alt="" priority></Image>
                  <div className="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0">
                    <div className="primary-info">
                      <h1 className="name mt-0 mb-1 text-white text-uppercase text-uppercase">Ashley Ong</h1>
                      <div className="title mb-3">Computer Engineer</div>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <Link href="mailto:ashley_2461994@hotmail.com">
                            <i className="far fa-envelope fa-fw mr-2" data-fa-transform="grow-3"></i>
                            ashley_2461994@hotmail.com
                          </Link>
                        </li>
                        <li>
                          <i className="fas fa-mobile-alt fa-fw mr-2" data-fa-transform="grow-6"></i>+65 9832 9188
                        </li>
                      </ul>
                    </div>
                    <div className="secondary-info ml-md-auto mt-2">
                      <ul className="resume-social list-unstyled">
                        <li className="mb-3">
                          <Link href="https://www.linkedin.com/in/ashley-ong-2816a8105/">
                            <span className="fa-container text-center mr-2">
                              <i className="fab fa-linkedin-in fa-fw"></i>
                            </span>
                            linkedin.com/in/ashley-ong-2816a8105/
                          </Link>
                        </li>
                        <li className="mb-3">
                          <Link href="https://github.com/ashleyyy94">
                            <span className="fa-container text-center mr-2">
                              <i className="fab fa-github-alt fa-fw"></i>
                            </span>
                            github.com/ashleyyy94
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.ashleyong.xyz">
                            <span className="fa-container text-center mr-2">
                              <i className="fas fa-globe"></i>
                            </span>
                            www.ashleyong.xyz
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </header>
              <div className="resume-body p-5">
                <section className="resume-section summary-section mb-5">
                  <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Career Summary</h2>
                  <div className="resume-section-content">
                    <p className="mb-0">
                      Currently working in SIA as a Senior Software Engineer. I focus mainly on Frontend development
                      using NextJS/ReactJS with a supporting Java API Backend.
                    </p>
                  </div>
                </section>
                <div className="row">
                  <div className="col-lg-9">
                    <section className="resume-section experience-section mb-5">
                      <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                        Work Experience
                      </h2>
                      <div className="resume-section-content">
                        <div className="resume-timeline position-relative">
                          <article className="resume-timeline-item position-relative pb-5">
                            <div className="resume-timeline-item-header mb-2">
                              <div className="d-flex flex-column flex-md-row">
                                <h3 className="resume-position-title font-weight-bold mb-1">
                                  Frontend Software Developer
                                </h3>
                                <div className="resume-company-name ml-auto">Jurong Town Corporation</div>
                              </div>
                              <div className="resume-position-time">May 2018 – Present</div>
                            </div>
                            <div className="resume-timeline-item-desc">
                              <ul>
                                <li>
                                  - Spearheaded a team of six in-house developers to create a completely new map
                                  application that displays geospatial information with KPIs that can be seen at a
                                  glance, increasing the performance of staff on the ground.
                                </li>
                                <li>
                                  - Used ReactJS with an assortment of UI Libraries, HTML and CSS to create a
                                  user-centric interface while ingesting both spatial and textual data from a Data Lake.
                                </li>
                                <li>
                                  - Utilised Agile Methodologies to lead standup meetings, communicate with users and
                                  integrate feedback into project timelines.
                                </li>
                                <li>
                                  - Conducted reviews of code and test cases prepared by the development and QA team.
                                </li>
                                <li>
                                  - Managed Tableau system on-premise, including server installation, operations, and
                                  handling user requirements.
                                </li>
                              </ul>
                              <h4 className="resume-timeline-item-desc-heading font-weight-bold">Technologies used:</h4>
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">React</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">Python</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">ArGIS</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">Tableau</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">HTML/CSS</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">PostgresSQL</span>
                                </li>
                              </ul>
                            </div>
                          </article>

                          <article className="resume-timeline-item position-relative pb-5">
                            <div className="resume-timeline-item-header mb-2">
                              <div className="d-flex flex-column flex-md-row">
                                <h3 className="resume-position-title font-weight-bold mb-1">
                                  Innovation Office Intern
                                </h3>
                                <div className="resume-company-name ml-auto">
                                  Certis Cisco / BRI Security (Australia)
                                </div>
                              </div>
                              <div className="resume-position-time">May 2017 – Oct 2017</div>
                            </div>
                            <div className="resume-timeline-item-desc">
                              <ul>
                                <li>
                                  - Evaluated mobile processors like Snapdragon 835 for Machine Learning and Neural
                                  Networks.
                                </li>
                                <li>
                                  - Used OutSystems to create a dashboard to support security operations, reducing
                                  manual overhead of checking in with security officers and improving overall deployment
                                  efficiency.
                                </li>
                                <li>
                                  - Designed a mobile app to act as an access controller using 2FA biometrics like
                                  fingerprints and iris patterns, which was implemented throughout the department to
                                  replace card access.
                                </li>
                              </ul>
                              <h4 className="resume-timeline-item-desc-heading font-weight-bold">Technologies used:</h4>
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">cuDNN</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">OutSystems</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">Android</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">Javascript</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">MySQL</span>
                                </li>
                              </ul>
                            </div>
                          </article>

                          <article className="resume-timeline-item position-relative pb-5">
                            <div className="resume-timeline-item-header mb-2">
                              <div className="d-flex flex-column flex-md-row">
                                <h3 className="resume-position-title font-weight-bold mb-1">
                                  Microsoft Student Partner
                                </h3>
                                <div className="resume-company-name ml-auto">Microsoft</div>
                              </div>
                              <div className="resume-position-time">May 2017 – May 2018</div>
                            </div>
                            <div className="resume-timeline-item-desc">
                              <ul>
                                <li>
                                  - Conducted an Introduction to Machine Learning Workshop for students in NUS and
                                  shared on the uses of Microsoft Azure.
                                </li>
                                <li>- Assisted in hosting Microsoft APAC MSP Summit in May 2018 held in NUS.</li>
                              </ul>
                              <h4 className="resume-timeline-item-desc-heading font-weight-bold">Technologies used:</h4>
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">Microsoft Azure</span>
                                </li>
                              </ul>
                            </div>
                          </article>

                          <article className="resume-timeline-item position-relative">
                            <div className="resume-timeline-item-header mb-2">
                              <div className="d-flex flex-column flex-md-row">
                                <h3 className="resume-position-title font-weight-bold mb-1">
                                  Geospatial Division Intern
                                </h3>
                                <div className="resume-company-name ml-auto">Singapore Land Authority</div>
                              </div>
                              <div className="resume-position-time">Jan-July 2015, Dec 2015</div>
                            </div>
                            <div className="resume-timeline-item-desc">
                              <ul>
                                <li>- Used ArcMap to update buildings and street names for OneMap 2.0.</li>
                                <li>
                                  - Assisted in the development of the OneMap application for SLA by importing and
                                  verifying data for the application, ensuring that it reached launch deadline on time.
                                </li>
                              </ul>
                              <h4 className="resume-timeline-item-desc-heading font-weight-bold">Technologies used:</h4>
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">ArcGIS</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">ArcMAP</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="badge badge-primary badge-pill">GeoServer</span>
                                </li>
                              </ul>
                            </div>
                          </article>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="col-lg-3">
                    <section className="resume-section skills-section mb-5">
                      <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                        Skills &amp; Tools
                      </h2>
                      <div className="resume-section-content">
                        <div className="resume-skill-item">
                          <h4 className="resume-skills-cat font-weight-bold">Frontend</h4>
                          <ul className="list-unstyled mb-4">
                            <li className="mb-2">
                              <div className="resume-skill-name">NextJS</div>
                              <div className="progress resume-progress">
                                <div
                                  className="progress-bar theme-progress-bar-dark"
                                  role="progressbar"
                                  style={{ width: '94%', ariaValuenow: '25', ariaValuemin: '0', ariaValuemax: '100' }}
                                ></div>
                              </div>
                            </li>
                            <li className="mb-2">
                              <div className="resume-skill-name">ReactJS</div>
                              <div className="progress resume-progress">
                                <div
                                  className="progress-bar theme-progress-bar-dark"
                                  role="progressbar"
                                  style={{ width: '100%', ariaValuenow: '25', ariaValuemin: '0', ariaValuemax: '100' }}
                                ></div>
                              </div>
                            </li>

                            <li className="mb-2">
                              <div className="resume-skill-name">Node.js</div>
                              <div className="progress resume-progress">
                                <div
                                  className="progress-bar theme-progress-bar-dark"
                                  role="progressbar"
                                  style={{ width: '90%', ariaValuenow: '25', ariaValuemin: '0', ariaValuemax: '100' }}
                                ></div>
                              </div>
                            </li>
                            <li className="mb-2">
                              <div className="resume-skill-name">HTML/CSS/SASS/LESS</div>
                              <div className="progress resume-progress">
                                <div
                                  className="progress-bar theme-progress-bar-dark"
                                  role="progressbar"
                                  style={{ width: '100%', ariaValuenow: '25', ariaValuemin: '0', ariaValuemax: '100' }}
                                ></div>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="resume-skill-item">
                          <h4 className="resume-skills-cat font-weight-bold">Backend</h4>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <div className="resume-skill-name">Python/Django</div>
                              <div className="progress resume-progress">
                                <div
                                  className="progress-bar theme-progress-bar-dark"
                                  role="progressbar"
                                  style={{ width: '98%', ariaValuenow: '25', ariaValuemin: '0', ariaValuemax: '100' }}
                                ></div>
                              </div>
                            </li>
                            <li className="mb-2">
                              <div className="resume-skill-name">Ruby/Rails</div>
                              <div className="progress resume-progress">
                                <div
                                  className="progress-bar theme-progress-bar-dark"
                                  role="progressbar"
                                  style={{ width: '60%', ariaValuenow: '25', ariaValuemin: '0', ariaValuemax: '100' }}
                                ></div>
                              </div>
                            </li>
                            <li className="mb-2">
                              <div className="resume-skill-name">Java</div>
                              <div className="progress resume-progress">
                                <div
                                  className="progress-bar theme-progress-bar-dark"
                                  role="progressbar"
                                  style={{ width: '90%', ariaValuenow: '25', ariaValuemin: '0', ariaValuemax: '100' }}
                                ></div>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="resume-skill-item">
                          <h4 className="resume-skills-cat font-weight-bold">Others</h4>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">Tailwind CSS</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">Machine Learning</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">ArcGIS</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">OutSystems</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">AWS/Azure DevOps</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">Code Review</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">Git</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">Unit Testing</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">Tableau</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">Solidity</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="badge bg-light text-dark">GPT + Langchain</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    <section className="resume-section education-section mb-5">
                      <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Education</h2>
                      <div className="resume-section-content">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <div className="resume-degree font-weight-bold">
                              Bachelor of Engineering (Computer Engineering)
                            </div>
                            <div className="resume-degree-org">National University of Singapore</div>
                            <div className="resume-degree-time">2015 - 2019</div>
                          </li>
                        </ul>
                      </div>
                    </section>
                    <section className="resume-section language-section mb-5">
                      <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Language</h2>
                      <div className="resume-section-content">
                        <ul className="list-unstyled resume-lang-list">
                          <li className="mb-2">
                            <span className="resume-lang-name font-weight-bold">English</span>{' '}
                            <small className="text-muted font-weight-normal">(Professional)</small>
                          </li>
                          <li className="mb-2 align-middle">
                            <span className="resume-lang-name font-weight-bold">Chinese</span>{' '}
                            <small className="text-muted font-weight-normal">(Native)</small>
                          </li>
                          <li>
                            <span className="resume-lang-name font-weight-bold">Japanese</span>{' '}
                            <small className="text-muted font-weight-normal">(Conversational)</small>
                          </li>
                        </ul>
                      </div>
                    </section>
                    <section className="resume-section interests-section mb-5">
                      <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Interests</h2>
                      <div className="resume-section-content">
                        <ul className="list-unstyled">
                          <li className="mb-1">Web Development</li>
                          <li className="mb-1">Blockchain Technologies</li>
                          <li className="mb-1">Artificial Intelligence</li>
                          <li className="mb-1">PC Building</li>
                          <li className="mb-1">International Chess</li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <footer className="footer text-center pt-2 pb-5">
            <small className="copyright">
              Designed with <span className="sr-only">love</span>
              <i className="fas fa-heart"></i> by{' '}
              <Link href="http://themes.3rdwavemedia.com" target="_blank">
                Xiaoying Riley
              </Link>{' '}
              for developers
            </small>
          </footer>
        </div>
      </main>
    </>
  );
}
