# mfe-react-module-federation

## Amazon Setup Notes

### S3

S3 bucket: `mfe-mf-dashboard`

### CloudFront Issues

`Manual cache invalidation`

- Create an Invalidation with is a manual way to tell cloudFront to use latest version of file
`/container/latest/index.html`

- When CloudFront sees a JS file, it automatically creates a unique hash but for HTML files it does not.

`Automated cache Invalidation`

AWS CLI has a run command to create an invalidation for us on a specific file:

`- run: aws cloudfront create-invalidation --distribution-id ${{ secrets.AWS_DISTRIBUTION_ID }} --paths "/container/latest/index.html"`

- https://d15nom3h2ehevv.cloudfront.net/