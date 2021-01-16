# react-swipeable-ui

Turn web application to fullpage slides easily.
Also working on mobile devices.

## Live demo

You can find demo [here](https://cv.jjablonski-it.vercel.app/).
```ts
import Scroll from "../components/Scroll";
import ExamplePage from "../components/ExamplePage";

function Home() {
  return (
    <Scroll pageIndicator="hover" navigation={false}>
      <ExamplePage text="One" />
      <ExamplePage text="Two" pageName="Custom name" />
      <h1>Html element page example</h1>
    </Scroll>
  );
}

export default Home;

```

## Todo

- [ ] Turning it into npm package
