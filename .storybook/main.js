module.exports = {
  stories: ['../src/stories/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    'storybook-addon-material-ui/register'
  ],
};
