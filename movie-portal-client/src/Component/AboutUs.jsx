import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="text-lg mb-6">
        Welcome to <span className="font-bold">Movie Port</span>, your ultimate destination for discovering, exploring, and enjoying the world of cinema!
      </p>
      <p className="text-lg mb-6">
        At <span className="font-bold">Movie Port</span>, we believe that movies have the power to entertain, educate, and connect people across cultures. Whether you're a casual viewer or a die-hard cinephile, our platform is designed to offer you an immersive and personalized movie experience.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p className="text-lg mb-6">
        Our mission is simple: to provide a comprehensive and user-friendly platform where movie lovers can find the latest films, explore classic masterpieces, and engage with a vibrant community. We aim to keep you up-to-date with the latest releases, movie trailers, and recommendations based on your preferences.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
      <ul className="list-disc pl-6 text-lg mb-6">
        <li>Movie Database: A vast collection of movies from every genre, including detailed information such as movie posters, plot summaries, ratings, and runtime.</li>
        <li>Personalized Recommendations: Our system suggests movies based on your interests, ensuring you never miss a great movie.</li>
        <li>User Profiles: Create your own profile, manage your favorite movies, and rate movies you've watched.</li>
        <li>Community Engagement: Connect with fellow movie enthusiasts, discuss your favorite films, and share recommendations with others.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
      <ul className="list-disc pl-6 text-lg mb-6">
        <li>Up-to-Date Content: We strive to provide the latest and most accurate movie data, keeping you informed about new releases and upcoming films.</li>
        <li>User-Centric Design: Our platform is designed with you in mind, providing a seamless and enjoyable experience whether you're browsing on desktop or mobile.</li>
        <li>Diverse Movie Selection: From Hollywood blockbusters to indie gems, from action-packed thrillers to heartwarming dramas, our collection covers all tastes and preferences.</li>
        <li>Favorite Movies: Easily add your favorite movies to your personal collection, and revisit them anytime.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
      <p className="text-lg mb-6">
        We're a dedicated team of movie lovers, designers, and developers who have come together to create a platform that enhances your movie-watching experience. We aim to continuously improve our site based on your feedback, ensuring that <span className="font-bold">Movie Port</span> remains the best place to discover and discuss movies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Get in Touch</h2>
      <p className="text-lg mb-6">
        We'd love to hear from you! If you have any questions, suggestions, or just want to talk about movies, don't hesitate to reach out. Our team is always here to assist you.
      </p>
    </div>
  );
};

export default AboutUs;
