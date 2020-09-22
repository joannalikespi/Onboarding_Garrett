# onboarding-project-template

This is an onboarding project for new members to learn about the basic technologies used in the `aie` project.

## Instructions
Create a streaming (fake) tweet viewer client.

There is a random tweet generator running at https://r-t-generator.herokuapp.com/.
Your goal is to write a desktop client for it that uses the technologies employed in aie.

The API supports two actions:
1. `/` returns an array of "new" tweets. It could be empty. The shape of `Tweet` is as follows:
    ```typescript
    interface Tweet {
      text: string;
      videoPath?: string;
    }
    ```
1. `/{videoPath}` fetches the video file located at `videoPath`.

You need to:
1. "Use this template" to create your own copy of the starter code.
1. Add your name to `package.json` and `electron-builder.js` (look for `YOUR_NAME_HERE`).
1. Commit code to a feature branch until you feel it's time to release a new iteration 
(i.e. Don't swarm the releases).
1. Implement the features.

### Things to build (and technology to use)
* Use the latest syntax you have come to know, make sure you use at least `async-await`, `Promise`.
* Use good coding style and practices.
* Use care to make this look like a desktop app, and not a webpage viewer 
(e.g. it might not be a good idea to scroll the entire page up and down).
* The app should fetch new tweets approximately every 15 seconds, and renders them vertically in the app
ordered latest to oldest (top to bottom). (RxJS)
* For each tweet, it should be rendered as a collapsed card showing the first 15 words, and when clicked,
opens to show the full tweet. (React Functional Components, react-bootstrap)
* In the full tweet view, if there is a video associated with the tweet, show that video.
* Prepare two themes that may differ in coloring or fonts, and allow the user to choose it. (React Context, store it in localStorage)
* When the user first navigates to the page, prompts the user to select the theme. (localStorage)
