export const PARTICIPANTS: string[] = ["Enoch Luk", "Miguel Liu-Schiaffini", "Joying Yang", "Kevin Zhang", "Phoebe Tang"]

// A broad, mostly everyday pool with a light Bay Area and technology flavor.
// The game only deals eight words at a time, so variety matters more than
// making every entry an inside joke.
const WORD_CANDIDATES: string[] = [
  // Brands, apps, and technology
  "Costco", "Ferrari", "LinkedIn", "Crocs", "IKEA", "Nintendo", 
   "Red Bull", "Lego", "GoPro", "Roomba", "Apple", "Android", "Google Maps",
  "YouTube", "TikTok", "Discord", "Reddit", "Wikipedia", "Spotify", "Netflix", "Uber",
  "DoorDash", "Airbnb", "Zoom", "Slack", "Notion", "Figma", "ChatGPT",
   "AirPods", "A merge conflict", "A CAPTCHA","An LLM hallucination", 
  // Places, buildings, and public spaces
  "Antarctica", "The Moon", "Times Square",
   "Venice", "San Francisco", "New York City", "Palo Alto",
  "An aquarium", "A swimming pool",
  "A college dorm", "A lecture hall", "A research lab",
   "A bakery", "A diner", "A hotel lobby", "The TSA Line",
  
  // Bay Area and California
   "The BART",  "A GPT Wrapper startup", "The University of California, Berkeley", "Stanford", "The California Institute of Technology", "Elon Musk", "Mark Zuckerberg",
  // Animals and creatures
  "Golden Retriever","Pigeon", "Praying mantis",  "Octopus", "Naked mole rat",
   "Cat", "Dog", "Hamster",
  "Goldfish", "Parrot", "Penguin", "Polar bear",  "Whale",
 "Lobster", "Frog", "Turtle", "Snake",
  "Lizard", "Chameleon", "Bat", "A cactus", "A venus flytrap", "A bonsai tree", 
  "A sunflower", "A four-leaf clover", "A tumbleweed", "A snowman",
  // Fiction and familiar characters
  "SpongeBob", "Batman", "Shrek", "Gandalf", "Barbie",  "Bigfoot",
  "A mall Santa", "A pirate", "Po from Kung Fu Panda", "Buzz Lightyear", "Elsa from Frozen", "Yoda", "A dragon", "A mermaid", 
  "A time traveler", "Spider-man", "Sally from Cars", "Dory",
  // Food and drinks
  "A gas station hot dog", "Brown Sugar Milk Tea", "A raw oyster", "Cold pizza",
   "A protein bar", "Soju",  "A charcuterie board",  "Avocado toast", "Garlic bread", 
  "Chicken tikka masala", "Banana bread",  "Popcorn", "Korean barbecue", "Coconut water", 
  // Jobs, people, and social situations
  "A firefighter", "A doctor", "A dentist", "A pharmacist", "An astronaut", "A politician", 
  "A professor", "A librarian", "A chef", "A vibe coder", "A barista", "A car mechanic",
  "A neighbor with a leaf blower", "Someone who brings a ukulele",
  "A person who is always five minutes late", "A friend who sends voice notes", "A person who is always an hour late", "A stranger who starts a conversation on a plane",
  "A person who claps when the plane lands", "A surprise plus-one", "A family group chat",
  "A road trip", "Being the impostor in Among Us", "Blacking out after one shot", "Someone who is always on DnD", 
  // Objects, activities, and ideas
  "A trench coat",
  "A rubber duck", "A traffic cone", "A monocle", "A trampoline", "A yacht", "A used car salesman", "A yoga instructor",  "An intern", "A pair of skis", "A wallet",  "A Rubik's Cube", "A karaoke machine", "A guitar",  "A participation award", "A pillow",
   "A security camera",  "A parking ticket", "A library card",  "A group project", "A pop quiz", "A final exam",  "A prank", "A Tesla",  "A meteorite", "A volcano", "A rainbow", "A thunderstorm", "A heat wave", "A snow day",
  "A power outage", "A traffic light",  "A telescope",
  "A microscope", 
]

export const WORDS = [...WORD_CANDIDATES, ...PARTICIPANTS]


const ADJECTIVE_CANDIDATES: string[] = [
  "chaotic", "trustworthy", "sketchy", "tuff", "vague", "gullible", "reliable", "flaky", "intense", "petty", "dramatic", "weird", "hot", "cringe", 
  "corporate", "sophisticated", "pretentious", "underappreciated", "overrated", "iconic", "high-maintenance", "intimidating", "LARP", "washed", "red flag", "main character",
  "cursed", "feral", "suspicious", "evil",  "big", "counterintuitive", "mission-driven", "outdoorsy", "delicious", "spicy", "expensive", "cozy", "portable", "luxurious"
];

export const ADJECTIVES = ADJECTIVE_CANDIDATES