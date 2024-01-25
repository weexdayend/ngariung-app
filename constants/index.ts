import { HiOutlineHomeModern, HiMagnifyingGlass, HiOutlineAcademicCap, HiOutlineUsers, HiOutlineUser } from 'react-icons/hi2';

export const sidebarLinks = [
  {
    imgURL: HiOutlineHomeModern,
    route: "/",
    label: "Home",
  },
  {
    imgURL: HiMagnifyingGlass,
    route: "/search",
    label: "Search",
  },
  {
    imgURL: HiOutlineAcademicCap,
    route: "/events",
    label: "Events",
  },
  {
    imgURL: HiOutlineUsers,
    route: "/communities",
    label: "Communities",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];

export interface Workshop {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  shortDescription: string;
  category: string;
  type: "Free" | "Paid";
  quota: string;
  speaker: string;
  location: string;
  organization: string;
}

export const testingWorkshopData: Workshop[] = [
  {
    "title": "Web Development Workshop",
    "description": "A comprehensive workshop covering the fundamentals of web development, including HTML, CSS, and JavaScript. Participants will learn how to build a basic website from scratch.",
    "date": "2022-05-15",
    "startTime": "09:00",
    "endTime": "17:00",
    "shortDescription": "Learn the basics of web development in this hands-on workshop.",
    "category": "Technology",
    "type": "Paid",
    "quota": "50",
    "speaker": "John Smith",
    "location": "123 Main Street",
    "organization": "Tech Academy"
  },
  {
    "title": "Data Science Seminar",
    "description": "An in-depth seminar exploring the field of data science and its applications. Topics covered include data analysis, machine learning, and data visualization.",
    "date": "2022-06-02",
    "startTime": "13:00",
    "endTime": "16:00",
    "shortDescription": "Discover the world of data science in this informative seminar.",
    "category": "Technology",
    "type": "Free",
    "quota": "100",
    "speaker": "Jane Doe",
    "location": "456 Elm Avenue",
    "organization": "Data Science Society"
  },
  {
    "title": "Cybersecurity Workshop",
    "description": "A hands-on workshop focusing on cybersecurity best practices. Participants will learn how to identify and mitigate common security threats.",
    "date": "2022-07-10",
    "startTime": "10:00",
    "endTime": "15:00",
    "shortDescription": "Enhance your knowledge of cybersecurity in this interactive workshop.",
    "category": "Technology",
    "type": "Paid",
    "quota": "30",
    "speaker": "Michael Johnson",
    "location": "789 Oak Road",
    "organization": "Secure IT Solutions"
  },
  {
    "title": "Artificial Intelligence Seminar",
    "description": "A thought-provoking seminar exploring the field of artificial intelligence and its impact on society. Topics covered include machine learning, neural networks, and ethical considerations.",
    "date": "2022-08-20",
    "startTime": "14:00",
    "endTime": "18:00",
    "shortDescription": "Delve into the world of artificial intelligence in this engaging seminar.",
    "category": "Technology",
    "type": "Free",
    "quota": "80",
    "speaker": "Sarah Thompson",
    "location": "321 Pine Boulevard",
    "organization": "AI Innovations"
  },
  {
    "title": "Mobile App Development Workshop",
    "description": "A practical workshop covering the essentials of mobile app development for iOS and Android. Participants will learn how to create a basic app using industry-standard tools.",
    "date": "2022-09-05",
    "startTime": "09:30",
    "endTime": "16:30",
    "shortDescription": "Get started with mobile app development in this hands-on workshop.",
    "category": "Technology",
    "type": "Paid",
    "quota": "40",
    "speaker": "Robert Wilson",
    "location": "987 Cedar Lane",
    "organization": "App Development Academy"
  },
  {
    "title": "Cloud Computing Seminar",
    "description": "An informative seminar exploring the benefits and challenges of cloud computing. Topics covered include cloud architecture, deployment models, and security considerations.",
    "date": "2022-10-12",
    "startTime": "11:00",
    "endTime": "14:00",
    "shortDescription": "Learn about the latest trends in cloud computing in this educational seminar.",
    "category": "Technology",
    "type": "Free",
    "quota": "60",
    "speaker": "Jennifer Brown",
    "location": "654 Maple Avenue",
    "organization": "Cloud Solutions Inc."
  },
  {
    "title": "Blockchain Workshop",
    "description": "A comprehensive workshop on blockchain technology and its applications. Participants will gain hands-on experience in building a simple blockchain network.",
    "date": "2022-11-25",
    "startTime": "10:30",
    "endTime": "17:30",
    "shortDescription": "Discover the potential of blockchain in this interactive workshop.",
    "category": "Technology",
    "type": "Paid",
    "quota": "25",
    "speaker": "David Wilson",
    "location": "321 Oak Street",
    "organization": "BlockTech Academy"
  }
]