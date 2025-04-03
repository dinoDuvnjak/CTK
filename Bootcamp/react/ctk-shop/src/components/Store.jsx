import React from 'react';
import '../styles/main.scss'; // Import global SCSS

function Store() {
  return (
    <section className="hero is-fullheight primary-hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title custom-title">Welcome to the Store</h1>
          <p className="subtitle" style={{ color: '#fff' }}>
            Explore our products and enjoy a seamless shopping experience.
          </p>
          {/* 
            You can add your store products grid here.
            For example, you might create product cards within columns.
          */}
          <div className="columns is-multiline">
            <div className="column is-4">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src="https://via.placeholder.com/640x480" alt="Product" />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="title is-5">Product 1</p>
                  <p className="subtitle is-6">$10.00</p>
                </div>
              </div>
            </div>
            {/* You can duplicate the above column for more products */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Store;
