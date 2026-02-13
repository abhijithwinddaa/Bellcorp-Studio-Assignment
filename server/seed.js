require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Event = require("./models/Event");
const Registration = require("./models/Registration");

const connectDB = require("./config/db");

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Registration.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    console.log("Cleared existing data");

    // Create test user
    const testUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    const organizer = await User.create({
      name: "Event Organizer",
      email: "organizer@example.com",
      password: "password123",
    });

    console.log("Created test users");
    console.log("  Login: test@example.com / password123");

    // Generate dates: mix of past and future
    const now = new Date();
    const pastDate = (daysAgo) =>
      new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const futureDate = (daysAhead) =>
      new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

    const events = [
      {
        name: "Web Development Summit 2026",
        organizer: organizer._id,
        location: "San Francisco, CA",
        date: futureDate(30),
        description:
          "A premier conference for web developers featuring talks on React, Node.js, and modern web architecture. Network with industry leaders and discover the latest trends in frontend and backend development.",
        capacity: 200,
        category: "conference",
        tags: ["web", "javascript", "react"],
      },
      {
        name: "React Advanced Workshop",
        organizer: organizer._id,
        location: "New York, NY",
        date: futureDate(14),
        description:
          "Hands-on workshop covering advanced React patterns including custom hooks, performance optimization, suspense, and server components. Suitable for intermediate to advanced developers.",
        capacity: 40,
        category: "workshop",
        tags: ["react", "frontend", "javascript"],
      },
      {
        name: "Startup Founders Meetup",
        organizer: testUser._id,
        location: "Austin, TX",
        date: futureDate(7),
        description:
          "Monthly meetup for startup founders and aspiring entrepreneurs. Share ideas, get feedback on your pitch, and connect with potential co-founders and investors.",
        capacity: 50,
        category: "meetup",
        tags: ["startup", "networking", "business"],
      },
      {
        name: "Cloud Architecture Webinar",
        organizer: organizer._id,
        location: "Online",
        date: futureDate(3),
        description:
          "Learn about designing scalable cloud architectures using AWS, Azure, and GCP. Covers microservices, serverless patterns, and cost optimization strategies.",
        capacity: 500,
        category: "webinar",
        tags: ["cloud", "aws", "architecture"],
      },
      {
        name: "Jazz Night Downtown",
        organizer: testUser._id,
        location: "Chicago, IL",
        date: futureDate(21),
        description:
          "An evening of live jazz performances featuring local and touring musicians. Enjoy classic standards and contemporary jazz in an intimate venue setting.",
        capacity: 120,
        category: "concert",
        tags: ["music", "jazz", "live"],
      },
      {
        name: "Data Science Bootcamp",
        organizer: organizer._id,
        location: "Seattle, WA",
        date: futureDate(45),
        description:
          "Intensive 2-day bootcamp covering Python for data science, machine learning fundamentals, and data visualization with real-world datasets and practical exercises.",
        capacity: 30,
        category: "workshop",
        tags: ["data-science", "python", "ml"],
      },
      {
        name: "Tech Career Fair 2026",
        organizer: organizer._id,
        location: "Los Angeles, CA",
        date: futureDate(60),
        description:
          "Connect with top tech companies hiring for engineering, product, and design roles. Bring your resume and portfolio for on-the-spot interviews.",
        capacity: 300,
        category: "other",
        tags: ["career", "hiring", "networking"],
      },
      {
        name: "Node.js Performance Tuning",
        organizer: organizer._id,
        location: "Online",
        date: futureDate(10),
        description:
          "Deep dive into Node.js performance optimization covering event loop, memory management, profiling tools, and best practices for high-throughput applications.",
        capacity: 100,
        category: "webinar",
        tags: ["nodejs", "performance", "backend"],
      },
      {
        name: "Design Systems Conference",
        organizer: testUser._id,
        location: "Portland, OR",
        date: futureDate(35),
        description:
          "Explore how leading companies build and maintain design systems. Topics include component libraries, design tokens, accessibility, and cross-team collaboration.",
        capacity: 150,
        category: "conference",
        tags: ["design", "ui", "ux"],
      },
      {
        name: "Indie Music Festival",
        organizer: testUser._id,
        location: "Denver, CO",
        date: futureDate(50),
        description:
          "A weekend festival showcasing independent artists across genres. Multiple stages, food vendors, and art installations in a scenic outdoor venue.",
        capacity: 500,
        category: "concert",
        tags: ["music", "indie", "festival"],
      },
      {
        name: "MongoDB Masterclass",
        organizer: organizer._id,
        location: "San Francisco, CA",
        date: futureDate(18),
        description:
          "Master MongoDB aggregation pipelines, indexing strategies, and schema design patterns. Includes hands-on exercises with real-world scenarios and performance benchmarks.",
        capacity: 35,
        category: "workshop",
        tags: ["mongodb", "database", "backend"],
      },
      {
        name: "AI & Ethics Panel Discussion",
        organizer: organizer._id,
        location: "Boston, MA",
        date: futureDate(25),
        description:
          "Leading researchers and industry professionals discuss the ethical implications of AI, responsible development practices, and the future of AI regulation.",
        capacity: 80,
        category: "meetup",
        tags: ["ai", "ethics", "discussion"],
      },
      // Past events
      {
        name: "JavaScript Conference 2025",
        organizer: organizer._id,
        location: "New York, NY",
        date: pastDate(60),
        description:
          "Annual JavaScript conference with talks from industry experts covering TypeScript, frameworks, tooling, and the future of the web platform.",
        capacity: 250,
        registeredCount: 245,
        category: "conference",
        tags: ["javascript", "web", "typescript"],
      },
      {
        name: "Python Workshop for Beginners",
        organizer: testUser._id,
        location: "Online",
        date: pastDate(30),
        description:
          "A beginner-friendly workshop introducing Python programming fundamentals including variables, loops, functions, and basic data structures.",
        capacity: 60,
        registeredCount: 58,
        category: "workshop",
        tags: ["python", "beginner", "programming"],
      },
      {
        name: "Local Tech Meetup — January",
        organizer: organizer._id,
        location: "Austin, TX",
        date: pastDate(15),
        description:
          "Monthly gathering of local tech professionals discussing industry trends, sharing project demos, and networking over food and drinks.",
        capacity: 40,
        registeredCount: 35,
        category: "meetup",
        tags: ["local", "networking", "tech"],
      },
      {
        name: "Acoustic Sessions Live",
        organizer: testUser._id,
        location: "Nashville, TN",
        date: pastDate(45),
        description:
          "Intimate acoustic performances by singer-songwriters in a cozy venue. An evening of original music and storytelling.",
        capacity: 75,
        registeredCount: 75,
        category: "concert",
        tags: ["music", "acoustic", "live"],
      },
      {
        name: "DevOps Best Practices Webinar",
        organizer: organizer._id,
        location: "Online",
        date: pastDate(7),
        description:
          "Overview of modern DevOps practices including CI/CD pipelines, Infrastructure as Code, monitoring, and incident response workflows.",
        capacity: 200,
        registeredCount: 142,
        category: "webinar",
        tags: ["devops", "cicd", "infrastructure"],
      },
    ];

    await Event.insertMany(events);
    console.log(`Seeded ${events.length} events`);

    console.log("\nSeed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
