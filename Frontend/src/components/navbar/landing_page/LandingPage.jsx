import "./LandingPage.css";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Transforming Education with Effortless Attendance Management</h2>
          <p>
            Our platform simplifies attendance tracking, enabling teachers to efficiently manage student presence and engagement with just a few clicks.
          </p>
          <Link to={'/login'} className="cta-button">Get Started</Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About the Platform</h2>
        <p>
          Designed with educators in mind, this platform provides a seamless and intuitive experience for managing student attendance. Whether you're in the classroom or teaching remotely, you can quickly log in, mark attendance, and access detailed reports, all within a user-friendly interface.
        </p>
      </section>

      {/* Features Section */}
      <section id="courses" className="courses">
        <h2>Key Features for Teachers</h2>
        <div className="course-list">
          <div className="course">
            
            <p>Log in to your account in seconds and start managing your attendance without delays.</p>
          </div>
          <div className="course">
          
            <p>Mark attendance with just a few clicks, saving you valuable time during your classes.</p>
          </div>
          <div className="course">
           
            <p>Get insights on student attendance trends to better understand and support your students' learning habits.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or need support, feel free to reach out to us:</p>
        <p>Email: <a href="mailto:support@educationplatform.com">support@educationplatform.com</a></p>
        <p>Phone: +234 70100 57350</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Education Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
