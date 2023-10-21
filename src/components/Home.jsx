import React, { useEffect } from 'react';
import '../Stylesheets/Home.css'
import { Link } from 'react-router-dom';

function Home({ users, reviews }) {




  return (
    <div>
      <header>
        <h1>Welcome to Movie Reviews</h1>
        <p>Discover, Review, and Share Your Favorite Movies</p>
        <Link to="/sign-up" className="cta-button">Get Started</Link>
      </header>

      <section id="features">
        <h2>Features</h2>
        <ul>
          <li>Sign up to start reviewing movies.</li>
          <li>To log-in navigate to Users page, and click on a user name!</li>
          <li>Search and find reviews for your favorite movies.</li>
          <li>Explore profiles and see reviews from other users.</li>
        </ul>
      </section>

      <section id="reviews">
        <h2><strong>Latest Reviews</strong></h2>

        <div className="review-card">
          {reviews.slice(-3).map((review, index) => (
            <div key={index}>
              <h3><strong>{`Reviewer Name: ${review.name}`}</strong></h3>
              <h5>{`Movie Name: ${review.movieTitle}`}</h5>
              <p>{`${review.reviewContent}`}</p>
            </div>
          ))}
        </div>

      </section>

      <section id="users">
        <h2>Top Users</h2>
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} className="user-card">
              {user.name}
            </li>
          ))}
        </ul>
      </section>

      <footer>
        &copy; 2023 Movie Reviews
      </footer>
    </div>
  );
}

export default Home;
