import React from 'react';
import '../Stylesheets/Home.css'
import { Link } from 'react-router-dom';

function Home({users}) {
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
                    <li>Sign up and log in to start reviewing movies.</li>
                    <li>Search and find reviews for your favorite movies.</li>
                    <li>Explore profiles and see reviews from other users.</li>
                </ul>
            </section>

            <section id="reviews">
                <h2>Latest Reviews</h2>
                <div className="review-card">
                    <img src="movie-poster-1.jpg" alt="Movie Poster 1" />
                    <h3>Movie Title 1</h3>
                    <p>User's review for Movie Title 1.</p>
                </div>

                <div className="review-card">
                    <img src="movie-poster-2.jpg" alt="Movie Poster 2" />
                    <h3>Movie Title 2</h3>
                    <p>User's review for Movie Title 2.</p>
                </div>

                <div className="review-card">
                    <img src="movie-poster-3.jpg" alt="Movie Poster 3" />
                    <h3>Movie Title 3</h3>
                    <p>User's review for Movie Title 3.</p>
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
