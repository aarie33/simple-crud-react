import React from 'react';
import PostList from '../../components/landing/PostList';
import LandingLayout from '../../layouts/LandingLayout';

const Index: React.FC = () => (
  <LandingLayout title="Post">
    <PostList showPagination={true} limitPost={10} />
  </LandingLayout>
);

export default Index;