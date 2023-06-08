import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  /* static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx)
  } */

  render(): JSX.Element {
    return (
      <Html lang='en-US'>
        <Head>
          <meta name='theme-color' content='#18181b' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <link rel='icon' href='/images/favicon.png' sizes='192x192' />
          <link rel='shortcut icon' href='/images/shortcut.png' type='image/png' />
          <link rel='apple-touch-icon' href='/images/appleicon.png' type='image/png' />

          {/* {process.env.NODE_ENV === 'production' && (
              <Script async defer
                strategy='afterInteractive'
                data-do-not-track='true'
                // please change to your data website id
                data-website-id=''
                // change to your hosted umami app
                src=''
              />
            )} */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
