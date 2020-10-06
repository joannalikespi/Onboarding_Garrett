import React, { FC, Fragment, useEffect, useState } from 'react';
import { Accordion, Button, ButtonGroup, Card, ToggleButton } from 'react-bootstrap';
import { Player } from 'video-react';

interface Tweet {
  text: string;
  videoPath?: string;
  id: string;
}

type ThemeSelectorProps = {
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeSelector = ({ radioValue, setRadioValue }: ThemeSelectorProps) => {
  const radios = [
    { name: 'Dark', value: 'dark' },
    { name: 'Light', value: 'light' },
  ];
  return (
    <ButtonGroup toggle>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          type="radio"
          variant="secondary"
          name="radio"
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => setRadioValue(e.currentTarget.value)}>
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

type TweetContProps = {
  tweets: Tweet[];
  theme: string;
};

const TweetContainer = ({ tweets, theme }: TweetContProps) => {
  const [activeKeyState, setActiveKey] = useState<string>('');

  const handleActiveKeyChange = (activeKey: string) => {
    if (activeKeyState === activeKey) {
      //allows us to close expanded item by clicking its toggle while open
      activeKey = '';
    }
    setActiveKey(activeKey);
  };

  return (
    <Accordion activeKey={activeKeyState} className={theme}>
      {tweets.map((tweet) => (
        <Card key={tweet.id}>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={tweet.id}
              onClick={() => handleActiveKeyChange(tweet.id)}>
              {tweet.text.split(' ').slice(0, 15).join(' ')}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={tweet.id}>
            <div>
              <Card.Body>{tweet.text.split(' ').slice(15).join(' ')}</Card.Body>
              {tweet.videoPath ? <Player playsInline src={tweet.videoPath} /> : <div></div>}
            </div>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

const App: FC = () => {
  const [tweetsList, setTweets] = useState<Tweet[]>();
  const [radioValue, setRadioValue] = useState('light');

  const updateTweets = (tweets: Tweet[]) => {
    // (async () => {
    // console.log(tweets);
    // do {
    //   fetchedTweets = await fetch('https://r-t-generator.herokuapp.com/').then(
    //     (response) => response.json() as Promise<Tweet[]>,
    //   );
    // } while (!fetchedTweets.length);
    fetch('https://r-t-generator.herokuapp.com/')
      .then((response) => response.json())
      .then((data) => {
        let fetchedTweets: Tweet[] = data;
        let i = 0;
        for (i; i < fetchedTweets.length; i++) {
          fetchedTweets[i].id = (i + (tweets ? tweets : []).length).toString(10);
          fetchedTweets[i].videoPath = fetchedTweets[i].videoPath
            ? 'https://r-t-generator.herokuapp.com/' + fetchedTweets[i].videoPath
            : undefined;
        }
        fetchedTweets = fetchedTweets.concat(tweets ? tweets : []);
        console.log(fetchedTweets);
        setTweets(fetchedTweets);
      });
    // eslint-disable-next-line no-console
    // })().catch(console.error);
  };

  useEffect(() => {
    const interval = setInterval((tweets: Tweet[] = tweetsList ? tweetsList : []) => {
      updateTweets(tweets ? tweets : []);
    }, 15000);
    return () => clearInterval(interval);
  }, [tweetsList]);
  return (
    <Fragment>
      <ThemeSelector radioValue={radioValue} setRadioValue={setRadioValue} />
      {tweetsExist(tweetsList, radioValue)}
      {/* {tweetsList && <pre>{JSON.stringify(tweetsList, null, 4)}</pre>} */}
    </Fragment>
  );
};

const tweetsExist = (tweetsList: Tweet[] | undefined, theme: string) => {
  if (tweetsList) {
    return <TweetContainer tweets={tweetsList.length > 25 ? tweetsList.slice(25) : tweetsList} theme={theme} />;
  } else {
    return <Fragment> No Tweets From Server </Fragment>;
  }
};

export default App;
