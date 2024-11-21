This is a simple example webapp to show the CSP errors when using the Scalar React Reference Component.

1. Clone the repo
1. cd into nextjs-blog
1. run `npm install`
1. run `npm run dev`
1. In your browser, navigate to localhost:3000/docs
1. Open Browser Developer console and take note of many Content-Security-Policy errors

Workaround to get Scalar docs to work. In middleware.ts, replace line 61 with `source: "/((?!api|docs|_next/static|_next/image|favicon.ico).*)",` 

Reload and the Scalar docs should work. 