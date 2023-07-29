import React from 'react';

interface HeadingProps {
  heading: string;
}

const Heading = ({ heading }: HeadingProps) => {
  return (
    <>
      <div className="dashboard-heading">
        <h4 className="h4">{heading}</h4>
      </div>
    </>
  );
};

export default Heading;
