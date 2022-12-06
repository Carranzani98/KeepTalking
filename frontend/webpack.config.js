module.exports = () => {
  return {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.(sa|sc)ss$/,
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|png|jpe?g|gif|svg)$/,
          include: [path.resolve(__dirname, './public')],
          type: 'file-loader',
          generator: {
            filename: '[path][name][ext]',
          },
        },
      ],
    },
    resolve: {
      alias: {
        '@/*': path.resolve(__dirname, 'src/'),
        '@public/*': path.resolve(__dirname, 'public/'),
      },
      extensions: ['.tsx', '.ts'],
    },
  }
}
