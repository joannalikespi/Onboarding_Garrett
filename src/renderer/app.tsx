import React, { FC, Fragment, useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';

// import ThemeSelector from './ThemeSelector';

interface Tweet {
  text: string;
  videoPath?: string;
  id: string;
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

type TweetContProps = {
  tweets: Tweet[];
};

const TweetContainer = ({ tweets }: TweetContProps) => {
  const [activeKeyState, setActiveKey] = useState<string>('');

  const handleActiveKeyChange = (activeKey: string) => {
    if (activeKeyState === activeKey) {
      //allows us to close expanded item by clicking its toggle while open
      activeKey = '';
    }
    setActiveKey(activeKey);
  };

  return (
    <Accordion activeKey={activeKeyState}>
      {tweets.map((tweet) => (
        <Card key={tweet.id}>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={tweet.id}
              onClick={() => handleActiveKeyChange(tweet.id)}>
              {tweet.text.substr(0, 15)}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={tweet.id}>
            <Card.Body>{tweet.text.substr(15)}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

const App: FC = () => {
  const [tweetsList, setTweets] = useState<Tweet[]>();

  useEffect((): void => {
    (async () => {
      let fetchedTweets: Tweet[];
      do {
        fetchedTweets = await fetch('https://r-t-generator.herokuapp.com/').then(
          (response) => response.json() as Promise<Tweet[]>,
        );
      } while (!fetchedTweets.length);
      let i = 0;
      for (i; i < fetchedTweets.length; i++) {
        fetchedTweets[i].id = i.toString(10);
      }
      setTweets(fetchedTweets);
      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, []);
  return (
    <Fragment>
      <ThemeSelector />
      {tweetsExist(tweetsList)}
      {/* {tweetsList && <pre>{JSON.stringify(tweetsList, null, 4)}</pre>} */}
    </Fragment>
  );
};

const tweetsExist = (tweetsList) => {
  if (tweetsList) {
    return <TweetContainer tweets={tweetsList} />;
  } else {
    return <Fragment />;
  }
};

export default App;
