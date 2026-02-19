import Bali1 from "../assets/International/Bali/1.jpg";
import Bali2 from "../assets/International/Bali/2.jpeg";
import Bali3 from "../assets/International/Bali/3.jpg";

import Nepal1 from "../assets/International/Nepal/1.jpg";
import Nepal2 from "../assets/International/Nepal/2.jpg";
import Nepal3 from "../assets/International/Nepal/3.jpg";

import Mauritius1 from "../assets/International/Mauritius/1.jpg";
import Mauritius2 from "../assets/International/Mauritius/2.jpg";
import Mauritius3 from "../assets/International/Mauritius/3.jpg";
import Mauritius4 from "../assets/International/Mauritius/4.jpg";
import Mauritius5 from "../assets/International/Mauritius/5.jpg";

import Dubai1 from "../assets/International/Dubai/1.jpg";
import Dubai2 from "../assets/International/Dubai/2.jpg";
import Dubai3 from "../assets/International/Dubai/3.jpg";

const internationalTours = [
  {
    id: 101,
    title: "Bali Adventure Tour Packages",
    subtitle: "Thrilling Escapades in the Island of Gods",
    location: "Bali, Indonesia",
    image: Bali1,
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 120,
    category: "HONEYMOON",
    type: "international",
    slug: "bali-paradise",
    overview:
      "Experience the magic of Bali with its pristine beaches, lush rice terraces, vibrant culture, and luxurious resorts. This package includes guided tours to iconic temples, water sports, romantic dinners, and plenty of leisure time to relax or explore on your own.",
    highlights: [
      "White water rafting on the Ayung River",
      "ATV ride through Bali's jungles",
      "Snorkeling and water sports at Tanjung Benoa",
      "Hiking Mount Batur for sunrise",
      "Explore Ubud's rice terraces and Monkey Forest",
    ],
    itinerary: [
      {
        day: "Day 1: Arrival in Bali",
        description:
          "Arrive at Ngurah Rai International Airport, transfer to hotel, relax and explore nearby beaches.",
      },
      {
        day: "Day 2: White Water Rafting & Ubud Tour",
        description:
          "Enjoy an exhilarating white water rafting experience on the Ayung River, followed by a visit to Ubud's rice terraces and Monkey Forest.",
      },
      {
        day: "Day 3: Mount Batur Sunrise Trek",
        description:
          "Early morning hike to Mount Batur for sunrise, breakfast with volcano views, return to hotel and leisure.",
      },
    ],
    inclusions: [
      "Transfers by AC Vehicle",
      "Assistance on Arrival",
      "All sightseeing as per itinerary by AC Vehicle",
      "Accommodation on a Double/Twin Sharing Basis with Breakfast",
      "Driver Charges / Bhatta, Toll Tax, Parking Fees, etc.",
    ],
    exclusions: [
      "Airfare / Train Fare",
      "5% GST",
      "Boat Ride Charges",
      "Guide Charges / Language Guide",
      "Monument Entrance Fees",
      "Travel Insurance",
      "Personal Expenses (drinks, laundry, telephone, etc.)",
      "Additional expenses due to flight delays, cancellations, weather conditions, political closures, or technical issues",
      "Any services not mentioned in the inclusions",
      "Temple Puja Charges",
      "Monument Entry Fees",
    ],
    images: [Bali1, Bali2, Bali3],
    additionalInfo: {
      bestTimeToVisit: "April to October",
      languages: "Indonesian, English",
      currency: "Indonesian Rupiah (IDR)",
      visa: "Visa on Arrival for Indians",
    },
  },

  {
    id: 105,
    title: "Nepal Kathmandu Tour",
    subtitle: "Himalayan Adventure in the Land of Temples",
    location: "Nepal",
    image: Nepal1,
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    reviews: 132,
    category: "ADVENTURE",
    type: "international",
    slug: "nepal",
    overview:
      "Discover the beauty and cultural richness of Nepal with our comprehensive Kathmandu tour package. From ancient temples and palaces to breathtaking mountain views and adventure activities, this tour offers a perfect blend of culture, history, and natural beauty. Explore the UNESCO World Heritage Sites in Kathmandu Valley, enjoy panoramic views of the Himalayas, and experience the warm hospitality and unique traditions of the Nepalese people.",
    highlights: [
      "Visit UNESCO World Heritage Sites including Pashupatinath Temple, Boudhanath Stupa, and Swayambhunath",
      "Explore the ancient cities of Kathmandu, Patan, and Bhaktapur with their rich architecture and culture",
      "Enjoy panoramic views of the Himalayas from Nagarkot",
      "Experience adventure activities in Pokhara including boating on Phewa Lake",
      "Explore the charming mountain town of Pokhara with views of the Annapurna range",
    ],
    itinerary: [
      {
        day: "Day 1: Arrival in Kathmandu",
        description:
          "Upon arrival at Tribhuvan International Airport in Kathmandu, our representative will meet you and transfer to your hotel. After check-in and refreshment, visit Kathmandu Durbar Square, a UNESCO World Heritage Site with ancient palaces, temples, and courtyards. In the evening, enjoy a welcome dinner with cultural performance. Overnight stay at the hotel in Kathmandu.",
      },
      {
        day: "Day 2: Kathmandu Valley Tour",
        description:
          "After breakfast, proceed for a full-day tour of Kathmandu Valley. Visit Pashupatinath Temple, one of the most sacred Hindu temples dedicated to Lord Shiva, Boudhanath Stupa, one of the largest stupas in the world, and Swayambhunath (Monkey Temple), an ancient religious complex atop a hill. In the afternoon, visit Patan Durbar Square, known for its rich cultural heritage and fine arts. Overnight stay at the hotel in Kathmandu.",
      },
      {
        day: "Day 3: Kathmandu to Nagarkot",
        description:
          "After breakfast, drive to Bhaktapur (approximately 14 km from Kathmandu). Visit Bhaktapur Durbar Square, known for its rich culture, temples, and wood, metal, and stone artworks. Continue to Nagarkot (approximately 20 km from Bhaktapur), a hill station famous for its panoramic views of the Himalayas including Mount Everest (on a clear day). Upon arrival, check-in to your hotel. Evening at leisure to enjoy the sunset over the Himalayas. Overnight stay at the hotel in Nagarkot.",
      },
      {
        day: "Day 4: Nagarkot to Pokhara",
        description:
          "After breakfast, drive to Pokhara (approximately 6-7 hours). Upon arrival, check-in to your hotel. Evening at leisure to explore Lakeside, the tourist hub of Pokhara, with its restaurants, shops, and vibrant atmosphere. Overnight stay at the hotel in Pokhara.",
      },
      {
        day: "Day 5: Pokhara Sightseeing",
        description:
          "Early morning, drive to Sarangkot to witness the sunrise over the Annapurna range (subject to weather conditions). Return to the hotel for breakfast. Later, proceed for a full-day tour of Pokhara including Davis Falls, Gupteshwor Cave, Bindabasini Temple, and the International Mountain Museum. Enjoy boating on Phewa Lake with views of the mountains reflected in the lake. Evening at leisure. Overnight stay at the hotel in Pokhara.",
      },
      {
        day: "Day 6: Pokhara to Kathmandu for Departure",
        description:
          "After breakfast, drive back to Kathmandu (approximately 6-7 hours). Upon arrival, transfer to Tribhuvan International Airport for your onward journey. Tour ends with beautiful memories of Nepal.",
      },
    ],
    inclusions: [
      "Transfers by AC Vehicle",
      "Assistance on Arrival",
      "All sightseeing as per itinerary by AC Vehicle",
      "Accommodation on a Double/Twin Sharing Basis with Breakfast",
      "Driver Charges / Bhatta, Toll Tax, Parking Fees, etc.",
    ],
    exclusions: [
      "Airfare / Train Fare",
      "5% GST",
      "Boat Ride Charges",
      "Guide Charges / Language Guide",
      "Monument Entrance Fees",
      "Travel Insurance",
      "Personal Expenses (drinks, laundry, telephone, etc.)",
      "Additional expenses due to flight delays, cancellations, weather conditions, political closures, or technical issues",
      "Any services not mentioned in the inclusions",
      "Temple Puja Charges",
      "Monument Entry Fees",
    ],
    images: [Nepal1, Nepal2, Nepal3],
    additionalInfo: {
      bestTimeToVisit: "March to May and September to November",
      languages: "Nepali, English",
      currency: "Nepalese Rupee (NPR)",
      visa: "Available on arrival for most nationalities",
    },
  },
  {
    id: 106,
    title: "Mauritius Island Paradise Tour",
    subtitle: "Tropical Bliss in the Indian Ocean",
    location: "Mauritius",
    image: Mauritius1,
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 145,
    category: "HONEYMOON",
    type: "international",
    slug: "mauritius",
    overview:
      "Experience the ultimate tropical paradise in Mauritius, an island destination renowned for pristine white-sand beaches, crystal-clear turquoise waters, vibrant coral reefs, and lush landscapes. This honeymoon package offers you a perfect blend of relaxation, adventure, and romance. Enjoy water sports, island hopping, cultural experiences, and romantic dinners under the stars.",
    highlights: [
      "Relax on pristine white-sand beaches",
      "Snorkeling and diving in crystal-clear coral reefs",
      "Island hopping and catamaran cruises",
      "Visit Chamarel's natural wonders and colored earth",
      "Explore vibrant local markets and cultural sites",
    ],
    itinerary: [
      {
        day: "Day 1: Arrival in Mauritius",
        description:
          "Upon arrival at Sir Seewoosagur Ramgoolam International Airport, our representative will meet you and transfer to your luxury resort. After check-in and refreshment, evening at leisure to relax or explore the beach. Welcome dinner at the resort. Overnight stay at the resort.",
      },
      {
        day: "Day 2: Beach Relaxation & Water Sports",
        description:
          "After breakfast, day at leisure for beach activities or relax by the pool. Optional water sports including snorkeling, kayaking, and jet skiing. Romantic dinner by the beach in the evening. Overnight stay at the resort.",
      },
      {
        day: "Day 3: Island Hopping & Catamaran Cruise",
        description:
          "After breakfast, embark on a full-day catamaran cruise visiting Ile aux Cerfs and other nearby islands. Enjoy snorkeling in crystal-clear waters, swimming, and beach time. Lunch is served on board. Return to the resort in the evening. Overnight stay at the resort.",
      },
      {
        day: "Day 4: Chamarel & Natural Wonders Tour",
        description:
          "After breakfast, visit Chamarel's famous colored earth and natural wonders. See the seven-colored earth formations and experience a waterfall. Visit a spice garden and local rum distillery. Return to the resort in the evening. Overnight stay at the resort.",
      },
      {
        day: "Day 5: Local Culture & Market Tour",
        description:
          "After breakfast, explore local villages and markets. Visit the vibrant Port Louis Market and explore local cuisine and handicrafts. Experience authentic Mauritian culture and traditions. Evening at leisure. Overnight stay at the resort.",
      },
      {
        day: "Day 6: Beach Day & Relaxation",
        description:
          "After breakfast, day at leisure for spa treatments or additional water sports. Enjoy the beach and resort amenities. Sunset watching on the beach. Special gala dinner at the resort in the evening. Overnight stay at the resort.",
      },
      {
        day: "Day 7: Departure from Mauritius",
        description:
          "After breakfast, check out from the resort and transfer to the airport for your onward journey. Tour ends with beautiful memories of your tropical paradise in Mauritius.",
      },
    ],
    inclusions: [
      "Transfers by AC Vehicle",
      "Assistance on Arrival",
      "All sightseeing as per itinerary by AC Vehicle",
      "Accommodation on a Double/Twin Sharing Basis with Breakfast",
      "Driver Charges / Bhatta, Toll Tax, Parking Fees, etc.",
    ],
    exclusions: [
      "Airfare / Train Fare",
      "5% GST",
      "Boat Ride Charges",
      "Guide Charges / Language Guide",
      "Monument Entrance Fees",
      "Travel Insurance",
      "Personal Expenses (drinks, laundry, telephone, etc.)",
      "Additional expenses due to flight delays, cancellations, weather conditions, political closures, or technical issues",
      "Any services not mentioned in the inclusions",
    ],
    images: [Mauritius1, Mauritius2, Mauritius3, Mauritius4, Mauritius5],
    additionalInfo: {
      bestTimeToVisit: "May to December",
      languages: "Mauritian Creole, French, English",
      currency: "Mauritian Rupee (MUR)",
      visa: "Visa on Arrival for Indians (up to 90 days)",
    },
  },

  {
    id: 107,
    title: "Dubai Adventure Tour",
    subtitle: "Extreme Thrills in the City of Gold",
    location: "Dubai, UAE",
    image: Dubai1,
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 175,
    category: "ADVENTURE",
    type: "international",
    slug: "dubai",
    overview:
      "Experience the perfect blend of luxury, adventure, and romance in Dubai, the City of Gold. This honeymoon package takes you through the most iconic attractions of Dubai, from the world's tallest building to pristine beaches and vast deserts. Stay in luxury hotels, enjoy private desert safaris, indulge in shopping at world-class malls, and create unforgettable memories with your loved one in this glamorous destination.",
    highlights: [
      "Dune bashing and sandboarding in the Arabian Desert",
      "Skydiving over Palm Jumeirah (optional)",
      "Desert quad biking and camel riding",
      "Indoor skiing at Ski Dubai",
      "Jet skiing and water sports at Jumeirah Beach",
    ],
    itinerary: [
      {
        day: "Day 1: Arrival in Dubai",
        description:
          "Upon arrival at Dubai International Airport, our representative will meet you and transfer to your luxury hotel. After check-in and refreshment, evening at leisure to explore the surrounding area or relax at the hotel. Overnight stay at the hotel in Dubai.",
      },
      {
        day: "Day 2: Dubai City Tour + Burj Khalifa + Fountain Show",
        description:
          "After breakfast, proceed for a half-day city tour of Dubai. Visit the Dubai Museum, Al Fahidi Fort, Jumeirah Mosque, Jumeirah Beach, and Palm Jumeirah. Also drive past Burj Al Arab for a photo stop. In the afternoon, visit Dubai Mall, one of the largest shopping malls in the world. In the evening, visit the observation deck of Burj Khalifa, the world's tallest building, for panoramic views of the city. Later, witness the spectacular Dubai Fountain Show. Overnight stay at the hotel in Dubai.",
      },
      {
        day: "Day 3: Desert Safari + BBQ Dinner",
        description:
          "After breakfast, morning at leisure to relax at the hotel or explore the city on your own. In the afternoon, proceed for a desert safari. Enjoy dune bashing in 4x4 vehicles, camel riding, sandboarding, and other activities in the desert. In the evening, enjoy a BBQ dinner under the stars with traditional entertainment including belly dance and Tanoura show. Return to the hotel for overnight stay.",
      },
      {
        day: "Day 4: Dhow Cruise with Dinner",
        description:
          "After breakfast, day at leisure to relax at the hotel or explore the city on your own. Optional activities include visiting Atlantis Aquaventure Waterpark, IMG Worlds of Adventure, or shopping at Mall of the Emirates. In the evening, enjoy a romantic dinner cruise on a traditional dhow in Dubai Creek or Dubai Marina with views of the illuminated skyline. Overnight stay at the hotel in Dubai.",
      },
      {
        day: "Day 5: Abu Dhabi Excursion",
        description:
          "After breakfast, proceed for a full-day excursion to Abu Dhabi, the capital of UAE. Visit the Sheikh Zayed Grand Mosque, one of the largest mosques in the world, Ferrari World (optional), and Yas Island. Also drive past the Emirates Palace Hotel and the Presidential Palace. Return to Dubai in the evening. Overnight stay at the hotel in Dubai.",
      },
      {
        day: "Day 6: Departure from Dubai",
        description:
          "After breakfast, check out from the hotel and transfer to Dubai International Airport for your onward journey. Tour ends with beautiful memories of your honeymoon in Dubai.",
      },
    ],
    inclusions: [
      "Transfers by AC Vehicle",
      "Assistance on Arrival",
      "All sightseeing as per itinerary by AC Vehicle",
      "Accommodation on a Double/Twin Sharing Basis with Breakfast",
      "Driver Charges / Bhatta, Toll Tax, Parking Fees, etc.",
    ],
    exclusions: [
      "Airfare / Train Fare",
      "5% GST",
      "Boat Ride Charges",
      "Guide Charges / Language Guide",
      "Monument Entrance Fees",
      "Travel Insurance",
      "Personal Expenses (drinks, laundry, telephone, etc.)",
      "Additional expenses due to flight delays, cancellations, weather conditions, political closures, or technical issues",
      "Any services not mentioned in the inclusions",
      "Temple Puja Charges",
      "Monument Entry Fees",
    ],
    images: [Dubai1, Dubai2, Dubai3],
    additionalInfo: {
      bestTimeToVisit: "October to April",
      languages: "Arabic, English",
      currency: "United Arab Emirates Dirham (AED)",
      visa: "Tourist visa required, can be arranged by the tour operator",
    },
  },
];

export default internationalTours;
