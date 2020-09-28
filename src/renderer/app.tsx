import React, { FC, Fragment, useEffect, useState } from 'react';

// import ThemeSelector from './ThemeSelector';

interface Tweet {
  text: string;
  videoPath?: string;
}

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

const TweetContainer: FC = () => {
  useEffect((): void => {
    console.log('Test');
  }, []);
  return (
    <Fragment>
      <div>this is a tweet container</div>;
    </Fragment>
  );
};

const App: FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>();

  useEffect((): void => {
    (async () => {
      let fetchedTweets: Tweet[];
      do {
        fetchedTweets = await fetch('https://r-t-generator.herokuapp.com/').then(
          (response) => response.json() as Promise<Tweet[]>,
        );
      } while (!fetchedTweets.length);
      setTweets(fetchedTweets);
      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, []);

  return (
    <Fragment>
      <ThemeSelector />
      <TweetContainer />
      {/* {tweets && <pre>{JSON.stringify(tweets, null, 4)}</pre>} */}
    </Fragment>
  );
};

export default App;
