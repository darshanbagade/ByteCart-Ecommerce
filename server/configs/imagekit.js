import ImageKit from "imagekit";

const getImagekit = () => {
    return new ImageKit({
        publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint : process.env.IMAGEKIT_ENDPOINT_URL
    })
}
export {getImagekit};