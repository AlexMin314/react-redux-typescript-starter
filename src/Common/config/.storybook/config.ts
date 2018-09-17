const storybook = require('@storybook/react');

function loadStories() {
  require('../../stories');
  // You can require as many stories as you need.
}

storybook.configure(loadStories, module);
