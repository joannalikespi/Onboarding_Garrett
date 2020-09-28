import React, { FC, Fragment, useEffect } from 'react';

const ThemeSelector: FC = () => {
  useEffect((): void => {
    console.log('Test');
  }, []);
  return (
    <Fragment>
      <div>this is a theme selector</div>;
    </Fragment>
  );
};

export default ThemeSelector;
