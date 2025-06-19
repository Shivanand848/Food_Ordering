import React from 'react';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">📞 Contact Us</h2>
          <p className="text-muted">We’d love to hear from you! Send us a message below.</p>
        </div>

        <div className="row g-4">
          {/* Contact Info */}
          <div className="col-md-4">
            <div className="bg-light p-4 rounded-4 shadow-sm h-100">
              <h5 className="mb-3"><i className="bi bi-geo-alt-fill text-warning me-2"></i> Address</h5>
              <p>123 Main St, Anytown, USA 12345</p>

              <h5 className="mb-3 mt-4"><i className="bi bi-telephone-fill text-warning me-2"></i> Phone</h5>
              <p>+1 740 834 5650</p>

              <h5 className="mb-3 mt-4"><i className="bi bi-envelope-fill text-warning me-2"></i> Email</h5>
              <p>support@ecomsite.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-8">
            <form className="bg-white p-4 rounded-4 shadow-sm">
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Name" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="Email" required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input type="text" className="form-control" placeholder="How can we help you?" required />
              </div>

              <div className="mb-4">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="5" placeholder="Write your message here..." required></textarea>
              </div>

              <button type="submit" className="btn btn-warning px-4 fw-bold">
                Send Message <i className="bi bi-send ms-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
