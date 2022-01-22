import Document, { Html, Main, Head, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="scrool-none scroolbar bg-scroolbar-white text-gray-800 dark:text-white bg-white">
          <Main />
          <div id="modal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}
