export function getImageFromS3(imageName) {
  const S3BucketURL = `https://2adfbnig40.execute-api.eu-west-2.amazonaws.com/Deployment/images/${imageName}`;
  const imageElement = document.getElementById('my-image');

  try {
    imageElement.src = S3BucketURL;
  } catch (error) {
    console.error('Error setting image:', error);
  }
}