module.exports = {
  entry: {
    'rsvp-form': './src/ui/rsvp-renderer.jsx',
    landing: './src/ui/landing-renderer.jsx',
    'rsvp-response': './src/ui/rsvp-response-renderer.jsx'
  },
  output: {
    path: __dirname,
    filename: './public/js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js.*/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
