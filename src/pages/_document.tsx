import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx)
  }

  render(): JSX.Element {
    return (
      <Html lang='en-US'>
        <Head />
        {/* <meta name='theme-color' content='#18181b' /> */}
        {/* <link rel='preload' href='/fonts/inter-var-latin.woff2' as='font' type='font/woff2' crossOrigin='' /> */}

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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
