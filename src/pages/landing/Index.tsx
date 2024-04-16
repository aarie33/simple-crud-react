import React from 'react';

const Navbar: React.FC = () => (
  <nav className="bg-blue-500 p-4 text-white">
    <h1>My Website</h1>
  </nav>
);

const BrandSection: React.FC = () => (
  <section className="bg-blue-200 p-4">
    <h2>Welcome to our website!</h2>
    <p>This is the best place to find interesting posts.</p>
  </section>
);

const Post: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="border p-4 my-2">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

const ListOfPosts: React.FC = () => {
  // Replace this with actual data fetching
  const posts = [
    { title: 'Post 1', content: 'This is the first post.' },
    { title: 'Post 2', content: 'This is the second post.' },
  ];

  return (
    <section className="p-4">
      {posts.map((post, index) => (
        <Post key={index} title={post.title} content={post.content} />
      ))}
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-blue-500 p-4 text-white mt-auto">
    <p>© 2022 My Website</p>
  </footer>
);

const Index: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <BrandSection />
    <ListOfPosts />
    <Footer />
  </div>
);

export default Index;