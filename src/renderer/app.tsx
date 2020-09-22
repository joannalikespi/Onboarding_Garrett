import React, { FC, Fragment, useEffect, useState } from 'react';

interface Tweet {
  text: string;
  videoPath?: string;
}

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
      <div>Hello world!</div>
      {tweets && <pre>{JSON.stringify(tweets, null, 4)}</pre>}
    </Fragment>
  );
};

export default App;
