module.exports = {
  entry: "./src/app/ui/rsvp.js",
  output: {
    path: __dirname,
    filename: "./public/js/rsvp.js"
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