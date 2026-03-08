import React from 'react';
import SectionPlaceholder from '../../components/admin/SectionPlaceholder';

const Newsletter: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Newsletter"
      description="Subscriber management can be added here without touching the Firebase auth shell again."
    />
  );
};

export default Newsletter;
