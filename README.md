# react-swipeable-ui

Turn web application to fullpage slides easily.
Also working on mobile devices.

## Live demo

You can find demo [here](https://swipeable.jjablonski-it.vercel.app/).

## Code samples

### Usage
```jsx
import Scroll from "../components/Scroll";
import ExamplePage from "../components/ExamplePage";

function Home() {
  return (
    <Scroll>
      <ExamplePage text="One" />
      <ExamplePage text="Two" pageName="Custom name" />
      <h1>Html element page example</h1>
    </Scroll>
  );
}

export default Home;

```

`Scroll` component props:

- `pageIndicator`: boolean | "always" | "hover"| "hover-only" | "never"\
Determines when will the page names be displayed
- `navigation`: boolean | ({pages, currentPage, forcePageChange}) => JSX.Element\
Default top navigation or a custom one
- `scrollableIndicator`: Show animation of scrolling at the first page load

### Custom navigation

```jsx
function Home() {
  return (
    <Scroll
      pageIndicator={false}
      navigation={({ currentPage, forcePageChange, pages }) => (
        <div style={{ position: "fixed", zIndex: 1 }}>
          {pages.map((page, i) => (
            <button
              key={i}
              onClick={() => forcePageChange(i)}
              style={{
                textDecoration: currentPage === i ? "underline" : "none",
              }}
            >
              {page.props.pageName || "Noname"}
            </button>
          ))}
        </div>
      )}
    >
      <ExamplePage text="One" />
      <ExamplePage text="Two" pageName="Custom name" />
      <h1>Html element page example</h1>
    </Scroll>
  );
}

export default Home;

```

or for a default navigation `navigation={true}`

## Todo

- [ ] Turning it into external npm package
