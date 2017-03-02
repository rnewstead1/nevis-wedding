module.exports = {
  entry: {
    invitation: './src/ui/invitation-renderer.jsx',
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
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
};
