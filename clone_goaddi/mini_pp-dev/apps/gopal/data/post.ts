export const postData = [
  {
    id: "3",
    firstName: "Ayo",
    lastName: "Idowu",
    content:
      "Had a wonderful time exploring the streets of Tokyo! The bustling energy, the neon lights, and the delicious street food made every moment unforgettable. Visiting historic temples and gardens provided moments of tranquility amidst the vibrant city life. Can't wait to go back! h",
    avatar: "/assets/avatar-7.png",
    verified: true,
    diary: false,
    createdAt: "2023-10-18T14:20:00Z",
    views: 185,
    images: ["/assets/post-3.png", "/assets/post-2.png"],
    likes: 80,
    commentsNum: 10,
    share: 20,
    bookmark: 25,
    comments: [
      {
        name: "Fuad Adigun",
        avatar: "/assets/avatar.png",
        text: "Tokyo looks amazing! It's definitely on my list of places to visit. Thanks for sharing your experience!",
        commentsNum: 8,
        verified: true,
      },
      {
        name: "Olajide Zaccheaus",
        avatar: "/assets/avatar-4.png",
        text: "I visited Tokyo last year, and it was an incredible experience! Your photos bring back so many memories.",
        commentsNum: 12,
        verified: true,
      },
    ],
  },

  {
    id: "1",
    firstName: "Fuad",
    lastName: "Adigun",
    content:
      "Sharing my adventure in Santorini, a place where blue skies meet the sea, and cute white houses hug the cliffs. Walking through the charming villages felt like stepping into history, with pretty flowers everywhere. The sunsets were like a painting, all pink. Exploring streets, I found a peaceful haven, where the breeze carried stories of the past. Santorini is not just a spot on the map; it's a cozy memory etched in my heart.",
    avatar: "/assets/avatar.png",
    verified: false,
    diary: true,
    createdAt: "2023-10-15T10:30:00Z",
    views: 203,

    images: ["/assets/post-1.png"],
    likes: 120,
    commentsNum: 15,
    share: 32,
    bookmark: 32,
    comments: [
      {
        name: "Olajide Zaccheaus",
        avatar: "/assets/avatar-4.png",
        text: "I really like the small things in this picture! The way the light and dark areas mix on the stone streets makes it a bit mysterious.",
        commentsNum: 10,
        verified: true,
      },
      {
        name: "Adeniyi Tofunmi",
        avatar: "/assets/avatar-3.png",
        text: "Enjoyment Man",
        verified: false,
      },
    ],
  },
  {
    id: "2",
    firstName: "Olajide",
    lastName: "Zaccheaus",
    content:
      "Had an amazing time hiking in the Swiss Alps! The views were breathtaking, with snow-capped peaks stretching as far as the eye could see. The crisp mountain air filled my lungs, and the sound of nature surrounded me. Truly a memorable experience that I'll cherish forever.",
    avatar: "/assets/avatar-4.png",
    verified: true,
    createdAt: "2023-10-16T08:45:00Z",
    views: 315,
    diary: false,
    images: ["/assets/post-1.png", "/assets/post-2.png", "/assets/post-1.png"],
    likes: 250, // Increased likes
    commentsNum: 25, // Increased comments
    share: 45, // Increased share
    bookmark: 40, // Decreased bookmark
    comments: [
      {
        name: "Fuad Adigun", // Changed commenter's name
        avatar: "/assets/avatar.png", // Changed avatar
        text: "Amazing photos! The Swiss Alps are on my bucket list. Can't wait to experience it myself!",
        commentsNum: 20, // Increased comments
        verified: false,
      },
      {
        name: "Ayo Idowu", // Added another commenter
        avatar: "/assets/avatar-7.png", // Added avatar
        text: "Looks like an incredible adventure! Thanks for sharing your journey with us.",
        commentsNum: 30, // Added comments
        verified: false,
      },
    ],
  },
  {
    id: "4",
    firstName: "Adeniyi",
    lastName: "Tofunmi",
    content:
      "Spent the weekend camping in the wilderness. Waking up to the sounds of nature, roasting marshmallows by the campfire, and stargazing under the clear night sky. It was a refreshing break from the hustle and bustle of city life.",
    avatar: "/assets/avatar-3.png",
    verified: false,
    diary: true,
    createdAt: "2023-10-20T09:00:00Z",
    views: 120,
    images: ["/assets/post-2.png"],
    likes: 50,
    commentsNum: 5,
    share: 15,
    bookmark: 10,
    comments: [
      {
        name: "Fuad Adigun",
        avatar: "/assets/avatar.png",
        text: "Camping sounds like a perfect getaway! I love reconnecting with nature. Thanks for sharing your experience!",
        commentsNum: 3,
        verified: false,
      },
      {
        name: "Ayo Idowu",
        avatar: "/assets/avatar-7.png",
        text: "I've been wanting to go camping for ages! Your post has inspired me to finally plan a trip. Thanks for sharing!",
        commentsNum: 7,
        verified: true,
      },
    ],
  },
];
