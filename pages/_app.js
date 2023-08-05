import React from 'react'

const App = ({ Component, pageProps }) => {
  return (
    <>
    {pageProps.preview && (
        <div>
          You are in preview-mode
          {/* This link will logout of Tina and exit preview mode */}
          <a
            href={`/admin/index.html#/logout?slug=/api/preview/exit?slug=${slug}`}
          >
            Click here
          </a>{' '}
          to exit
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
};

export default App;
