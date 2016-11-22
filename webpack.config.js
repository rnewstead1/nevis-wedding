module.exports = {
  entry: "./src/app/ui/rsvp-renderer.jsx",
  output: {
    path: __dirname,
    filename: "./public/js/client.js"
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