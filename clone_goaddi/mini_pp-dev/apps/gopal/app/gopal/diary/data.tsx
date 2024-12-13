import { IPOST } from "@/interfaces/posts";

const post: IPOST = {
    id: "123",
    firstName: "John",
    lastName: "Doe",
    caption: "This is a post caption",
    avatar: "https://example.com/avatar.jpg",
    commentsCount: "5",
    verified: true,
    commmentsNum: 5, // Optional property
    commentsLists: [], // Optional property
    share: 10,
    bookmark: 20,
    createdAt: "2024-04-26",
    likedStatus: true,
    likesCount: "100",
    views: 50,
    images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    likes: 100,
    commentsNum: 3,
    diary: false,
    comments: [
        {
            name: "Alice",
            avatar: "https://example.com/alice-avatar.jpg",
            text: "This is the first comment",
            verified: true
        },
        {
            name: "Bob",
            avatar: "https://example.com/bob-avatar.jpg",
            text: "This is the second comment",
            verified: false
        }
    ],
    "userinfo": [
        {
            "id": "181",
            "firstName": "Fuad",
            "lastName": "Adigun",
            "username": "ggg",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocIacdTqV29j0OtniHKDt7bMOla0HzmVGoV4g8OFedSd=s96-c"
        }
    ], 
    "files": [
        {
            "id": "266",
            "url": "https://res.cloudinary.com/dfn7yfwy3/image/upload/v1714119171/gopaddi-staging/mwz8592j9wvrrquxuarn.png"
        }
    ],
};

export default post;