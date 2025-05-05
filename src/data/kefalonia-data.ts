
export interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: 'Beach' | 'Village' | 'Historical' | 'Nature' | 'Landmark' | 'Cultural';
  description: string;
  howToGetThere: string;
  bestTime: string;
  images: string[];
  tip?: string;
}

export const locations: Location[] = [
  {
    id: 1,
    name: "Myrtos Beach",
    lat: 38.342567,
    lng: 20.536417,
    category: "Beach",
    description: "A stunning white pebble beach surrounded by dramatic limestone cliffs. Known for its striking turquoise waters and considered one of the most photographed beaches in Greece.",
    howToGetThere: "30 km north of Argostoli (30-minute drive). Access via steep winding road with parking available at the top. Beach accessed by steps.",
    bestTime: "Morning for best swimming conditions. Afternoon light provides stunning photographic opportunities. Avoid midday in peak summer.",
    images: [
      "https://c8.alamy.com/comp/EY2PYT/myrtos-beach-kefalonia-island-greece-aerial-view-EY2PYT.jpg",
      "https://www.greeka.com/village_beach/photos/826/myrtos-top-3-1280.jpg"
    ],
    tip: "Bring water shoes as the beach is pebbly, and pack supplies as there are limited facilities. The drive down offers several viewpoints perfect for photos."
  },
  {
    id: 2,
    name: "Melissani Cave",
    lat: 38.25250,
    lng: 20.62361,
    category: "Nature",
    description: "A breathtaking underground lake inside a cave with a collapsed roof that allows sunlight to create magical blue light effects on the crystal-clear waters below.",
    howToGetThere: "Located near Karavomylos, just 2 km from Sami. Well-signposted with parking facilities. Access via stairs down to boat tours.",
    bestTime: "Between 11am and 1pm when sunlight directly enters the cave, creating the most spectacular light effects.",
    images: [
      "https://www.exclusiveprivatevillas.com/app/uploads/2024/01/Melissani-Cave-Kefalonia-Greece-IMG-2-TESTO.jpg",
      "https://queenonajourney.com/wp-content/uploads/2020/12/Best_things_to_do_in_Kefalonia_Melissani-cave-1024x683.jpg"
    ],
    tip: "The entrance fee includes a short boat tour with a guide. Visit earlier in the day to avoid crowds and have more time to take photos."
  },
  {
    id: 3,
    name: "Assos Village",
    lat: 38.378940,
    lng: 20.539952,
    category: "Village",
    description: "A postcard-perfect fishing village with colorful houses clustered on a small peninsula beneath a 16th-century Venetian fortress. Calm, shallow waters and relaxed atmosphere.",
    howToGetThere: "40 min drive from Argostoli via the coastal road. Park at the village entrance as streets are narrow. Walking is the best way to explore.",
    bestTime: "Late afternoon for golden light on the colorful houses and a sunset dinner at a waterfront taverna.",
    images: [
      "https://as2.ftcdn.net/jpg/02/17/21/63/1000_F_217216373_TJrdBLdrfzxIJbw464TlcCI7fxdOysWI.jpg",
      "https://c8.alamy.com/comp/PDK1HC/assos-village-beautiful-view-to-vivid-colorful-houses-near-blue-turquoise-colored-transparent-bay-lagoon-kefalonia-greece-PDK1HC.jpg"
    ],
    tip: "Hike up to the Venetian fortress ruins for panoramic views of the entire peninsula and bay. The walk takes about 25 minutes each way."
  },
  {
    id: 4,
    name: "Fiskardo Village",
    lat: 38.458889,
    lng: 20.576389,
    category: "Village",
    description: "An elegant harbor village that survived the 1953 earthquake, preserving its Venetian architecture. Known for colorful fishing boats, upscale boutiques, and waterfront dining.",
    howToGetThere: "Located at the northernmost tip of the island, 50 km from Argostoli (1-hour drive). Limited parking, so arrive early.",
    bestTime: "Early evening when fishing boats return and the waterfront comes alive with dining and people watching.",
    images: [
      "https://c8.alamy.com/comp/H4F3NH/traditional-greek-fishing-boat-in-port-of-fiskardo-village-kefalonia-H4F3NH.jpg",
      "https://viewsofgreece.gr/wp-content/uploads/2019/01/%CE%98%CE%95%CE%9C%CE%91-%CE%A6%CE%99%CE%A3%CE%9A%CE%91%CE%A1%CE%94%CE%9F01-1280x640.jpg"
    ],
    tip: "Take a short walking trail around the headland to discover Roman cemetery ruins and impressive views across to Ithaca."
  },
  {
    id: 5,
    name: "Drogarati Cave",
    lat: 38.23333,
    lng: 20.63333,
    category: "Nature",
    description: "An impressive 60-million-year-old cave with spectacular stalactites and stalagmites. Features a large chamber known as \"Sala of Apotheosis\" with exceptional acoustics used for concerts.",
    howToGetThere: "Located 5 km south of Sami, well signposted from the main road with parking available. Access via steep stairs.",
    bestTime: "Morning to avoid tour groups. Cave maintains a constant temperature of 18°C year-round, making it a cool retreat in summer.",
    images: [
      "https://www.greeka.com/seedo/photos/118/kefalonia-drogarati-cave-top-1-1280.jpg",
      "https://kefaloniageopark.gr/sites/default/files/2021-03/AND_4217.jpg"
    ],
    tip: "Combined tickets with Melissani Cave are available for a discount. The cave is lit dramatically but can be slippery, so wear appropriate footwear."
  },
  {
    id: 6,
    name: "Antisamos Beach",
    lat: 38.260638,
    lng: 20.673937,
    category: "Beach",
    description: "A stunning beach with crystal-clear turquoise waters against a backdrop of lush green hills. Pebbled shore with excellent facilities and water sports opportunities.",
    howToGetThere: "Located 4 km east of Sami. Well-maintained road with parking available. Featured in the movie \"Captain Corelli's Mandolin.\"",
    bestTime: "Morning for calmer waters and to secure a good spot. The beach gets busy in peak season.",
    images: [
      "https://c8.alamy.com/comp/2H13X0H/aerial-view-of-sunny-antisamos-beach-on-the-kefalonia-island-ionian-sea-in-summer-greece-travel-vacation-concept-2H13X0H.jpg",
      "https://c8.alamy.com/comp/2GYT386/aerial-view-of-antisamos-beach-a-popular-tourist-destination-near-the-town-of-sami-kefalonia-ionian-islands-greece-2GYT386.jpg"
    ],
    tip: "For more privacy, walk to the northern end of the beach. Several excellent tavernas sit just behind the beach serving fresh seafood."
  },
  {
    id: 7,
    name: "St. George's Castle",
    lat: 38.172778,
    lng: 20.589444,
    category: "Historical",
    description: "A 16th-century Venetian fortress perched on a 320m hill with panoramic views across southern Kefalonia. Once the capital of the island until 1757.",
    howToGetThere: "Located 7 km southeast of Argostoli near Peratata village. Good road access with parking available near the entrance.",
    bestTime: "Late afternoon for cooler temperatures and golden light on the stonework. Great sunset views.",
    images: [
      "https://www.enos-properties.com/wp-content/uploads/2023/04/Castle-of-St-George.jpg",
      "https://www.greeka.com/seedo/photos/122/kefalonia-castle-of-saint-george-top-1-1280.jpg"
    ],
    tip: "Visit the small church inside the castle walls and check the opening hours in advance as they vary seasonally."
  },
  {
    id: 8,
    name: "Petani Beach",
    lat: 38.261602,
    lng: 20.380215,
    category: "Beach",
    description: "A dramatic beach with white pebbles and azure waters, framed by steep cliffs. Similar to Myrtos but less crowded, with excellent sunset views.",
    howToGetThere: "Located on the Paliki peninsula, 13 km from Lixouri. Accessible via a scenic winding road with several viewpoints.",
    bestTime: "Late afternoon to catch the spectacular sunset over the Ionian Sea.",
    images: [
      "https://www.greeka.com/seedo/photos/60/kefalonia-petani-top-3-1280.jpg",
      "https://ionian-villas.co.uk/wordpress/wp-content/uploads/2012/02/Petani-Beach-1024x768.jpg"
    ],
    tip: "The beach gets deep quickly, making it perfect for swimming but less ideal for small children. Several good tavernas overlook the beach."
  },
  {
    id: 9,
    name: "Xi Beach",
    lat: 38.160890,
    lng: 20.415815,
    category: "Beach",
    description: "A unique beach with fine reddish-orange sand and shallow, warm waters. Named for its X-shaped bay, it offers excellent facilities and water sports.",
    howToGetThere: "Located on the Paliki peninsula, 8 km south of Lixouri. Good road access with ample parking.",
    bestTime: "Morning to early afternoon when the unique orange clay cliffs contrast beautifully with the blue sea.",
    images: [
      "https://www.greeka.com/seedo/photos/61/kefalonia-xi-top-2-1280.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/13/ef/b6/b6/xi-beach.jpg"
    ],
    tip: "The red clay is said to have therapeutic properties—visitors often apply it as a natural skin treatment. The shallow water makes it perfect for families."
  },
  {
    id: 10,
    name: "Mount Ainos",
    lat: 38.14000,
    lng: 20.65778,
    category: "Nature",
    description: "The highest mountain in the Ionian Islands (1,628m) and a national park home to unique Greek fir forests and wild horses. Offers spectacular hiking and views.",
    howToGetThere: "Located in central Kefalonia, 25 km from Argostoli. Access via well-marked roads to the entrance of the national park.",
    bestTime: "Early morning for best chances of spotting wildlife and clearer views. Avoid midday summer heat.",
    images: [
      "https://www.discovergreece.com/sites/default/files/styles/hd_half_width/public/2021-01/mount-ainos-viewpoint-kefalonia-DG.jpg",
      "https://kefaloniageopark.gr/sites/default/files/2021-03/ROS_4486.jpg"
    ],
    tip: "Pack proper hiking footwear and plenty of water. The summit hike takes 2-3 hours round trip. Look for the endemic Ainos fir trees and wild horses."
  },
  {
    id: 11,
    name: "Fanari Lighthouse",
    lat: 38.19135,
    lng: 20.46784,
    category: "Landmark",
    description: "An elegant 19th-century circular lighthouse with striking white columns built by the British in 1828. Offers stunning views across Argostoli Bay.",
    howToGetThere: "Located 3 km southwest of Argostoli on the Lassi peninsula. Easy to reach by car with nearby parking.",
    bestTime: "Sunset for magical views and photographs as the sun goes down over Paliki peninsula.",
    images: [
      "https://www.evendo.com/cdn/common/kefalonia-attractions/lighthouse-of-saint-theodoros/lighthouse-of-saint-theodoros-min.jpg",
      "https://www.greeka.com/seedo/photos/115/kefalonia-lighthouse-top-1-1280.jpg"
    ],
    tip: "The lighthouse itself can't be entered, but the surrounding area is perfect for a relaxing stroll and spotting loggerhead turtles in the bay below."
  },
  {
    id: 12,
    name: "De Bosset Bridge",
    lat: 38.17500,
    lng: 20.49583,
    category: "Landmark",
    description: "A historic stone bridge crossing Koutavos Lagoon, built in 1813 during British rule. At 689.9m, it's the longest stone bridge over sea in the world.",
    howToGetThere: "Located at the edge of Argostoli, crossing the lagoon. Pedestrian access only, with parking available on the town side.",
    bestTime: "Early morning or late afternoon when the light is soft and the lagoon water is calm, creating beautiful reflections.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Kefalonia_Fae376.jpg",
      "https://www.greeka.com/seedo/photos/124/kefalonia-de-bosset-bridge-top-2-1280.jpg"
    ],
    tip: "Look for the obelisk at the center of the bridge, erected in honor of Sir Charles Napier. The lagoon is a nature reserve where you can spot herons and other waterbirds."
  },
  {
    id: 13,
    name: "Skala Beach",
    lat: 38.074097,
    lng: 20.79684,
    category: "Beach",
    description: "A long, well-organized Blue Flag beach with a mix of sand and pebbles and crystal-clear waters. Backed by hotels and tavernas with excellent facilities.",
    howToGetThere: "Located in the village of Skala on the southeastern coast, 40 km from Argostoli. Good road access with plenty of parking.",
    bestTime: "Morning for calmer seas and to secure a good spot. The beach gets busy in the afternoon.",
    images: [
      "https://www.greeka.com/seedo/photos/183/kefalonia-skala-beach-top-1-1280.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/db/17/c4/skala-beach.jpg"
    ],
    tip: "Walk south along the beach to discover the remains of a Roman villa with mosaic floors. Beach umbrellas are available for rent, but the southern end is quieter."
  },
  {
    id: 14,
    name: "Avithos Beach",
    lat: 38.098091,
    lng: 20.549574,
    category: "Beach",
    description: "A serene sandy beach with shallow, child-friendly waters in a sheltered bay. Backed by dramatic red cliffs and less crowded than many Kefalonian beaches.",
    howToGetThere: "Located near Svoronata village, 10 km from Argostoli and close to the airport. Well-signed road access with parking available.",
    bestTime: "Morning for calm waters and to avoid airport noise, which can occasionally be heard in the afternoon.",
    images: [
      "https://www.greeka.com/seedo/photos/177/kefalonia-avithos-top-1-1280.jpg",
      "https://www.worldbeachguide.com/photos/avithos-beach-greece.jpg"
    ],
    tip: "There are excellent tavernas at the back of the beach. The shallow water extends quite far out, making it ideal for families with young children."
  },
  {
    id: 15,
    name: "Makris Gialos Beach",
    lat: 38.153544,
    lng: 20.482400,
    category: "Beach",
    description: "A popular sand and pebble beach with turquoise waters just outside Argostoli. Well-organized with water sports facilities and beachside bars.",
    howToGetThere: "Located in Lassi area, just 3 km from Argostoli. Easy to reach by car or a pleasant 30-minute walk from the capital.",
    bestTime: "Early to mid-morning before it gets crowded, or late afternoon when many day-visitors leave.",
    images: [
      "https://www.greeka.com/seedo/photos/767/kefalonia-makris-gialos-top-1-1280.jpg",
      "https://kefalonia-hotels.com/wp-content/uploads/2015/05/Makris-Yalos-beach-in-Lassi.jpg"
    ],
    tip: "Connected to neighboring Platis Gialos beach by a small path. Visit both in one day and compare the slightly different landscapes."
  },
  {
    id: 16,
    name: "Platia Ammos Beach",
    lat: 38.217000,
    lng: 20.35513,
    category: "Beach",
    description: "A secluded beach with golden sand and pebbles, accessible only via 400 steps or by boat. The effort is rewarded with pristine waters and isolation.",
    howToGetThere: "Located on the west coast of the Paliki peninsula. Access via a dirt road ending at a parking area, then down 400 steps.",
    bestTime: "Morning to early afternoon for the best light and to have enough time to climb back up before sunset.",
    images: [
      "https://www.greeka.com/seedo/photos/766/kefalonia-platia-ammos-top-1-1280.jpg",
      "https://www.blazinggreece.com/wp-content/uploads/platia-ammos-350x233.jpg"
    ],
    tip: "Bring all supplies as there are no facilities on this beach. The stairs are demanding but the privacy and unspoiled beauty make it worthwhile."
  },
  {
    id: 17,
    name: "Agia Efimia Village",
    lat: 38.30300,
    lng: 20.59667,
    category: "Village",
    description: "A charming, traditional fishing village with a picturesque harbor filled with colorful boats. A relaxed alternative to busier tourist spots with excellent tavernas.",
    howToGetThere: "Located on the east coast, 28 km from Argostoli. Well-maintained road with beautiful coastal views.",
    bestTime: "Early evening when fishing boats return and the waterfront promenade becomes lively with diners.",
    images: [
      "https://www.greeka.com/seedo/photos/214/kefalonia-agia-efimia-top-1-1280.jpg",
      "https://verdeemare.com/wp-content/uploads/D860259-Pano.jpg"
    ],
    tip: "Agia Efimia serves as a good base for exploring nearby beaches. Several boat rental companies offer reasonable rates to discover hidden coves accessible only from the sea."
  },
  {
    id: 18,
    name: "Koroni Beach",
    lat: 38.081849,
    lng: 20.689133,
    category: "Beach",
    description: "A secluded golden sand beach with crystal-clear waters, backed by olive groves and cypress trees. Less developed and more tranquil than nearby Skala.",
    howToGetThere: "Located 3 km north of Skala. Access via a dirt road with limited signage. Some parking available under olive trees.",
    bestTime: "Morning or late afternoon when the sun isn't directly overhead, creating better swimming conditions.",
    images: [
      "https://amazingkefalonia.com/wp-content/uploads/2024/01/koroni-kefalonia-beach.jpg",
      "https://www.salamis-apollo-karystos.gr/wp-content/uploads/2021/01/koroni.jpg"
    ],
    tip: "The beach has minimal facilities, so bring what you need. Perfect for those seeking a quiet, natural setting away from crowds."
  },
  {
    id: 19,
    name: "Atheras Beach",
    lat: 38.336389,
    lng: 20.410556,
    category: "Beach",
    description: "A peaceful pebble beach in a protected bay with calm, shallow waters. Set against a backdrop of green hills with a traditional Greek atmosphere.",
    howToGetThere: "Located in the northwest of the island, 36 km from Argostoli. Access via a scenic winding mountain road.",
    bestTime: "Late afternoon when the sun illuminates the bay and mountains in golden light.",
    images: [
      "https://www.greeka.com/seedo/photos/768/kefalonia-atheras-top-1-1280.jpg",
      "https://www.blueseagreece.com/wp-content/uploads/2019/04/ATHERAS-BEACH-KEFALONIA.jpg"
    ],
    tip: "The local taverna serves excellent fresh fish caught by local fishermen. Look out for the small church of Agios Spiridon at the northern end of the beach."
  },
  {
    id: 20,
    name: "Lourdas Beach",
    lat: 38.120449,
    lng: 20.629470,
    category: "Beach",
    description: "A long stretch of sand and pebble beach beneath the slopes of Mount Ainos. Offers spectacular mountain and sea views with excellent amenities.",
    howToGetThere: "Located 16 km southeast of Argostoli. Access via a steep road down from Lourdata village with several parking areas.",
    bestTime: "Morning for swimming and sunbathing; evening for sunset views and dining at beachfront tavernas.",
    images: [
      "https://www.greeka.com/seedo/photos/184/kefalonia-lourdas-top-1-1280.jpg",
      "https://beachmap.pythonanywhere.com/media/images/beaches/Greece/Kefalonia/lourdas-beach.jpg"
    ],
    tip: "The beach is actually several connected stretches—walk east for more secluded spots away from the main facilities."
  },
  {
    id: 21,
    name: "Katavothres",
    lat: 38.18333,
    lng: 20.48333,
    category: "Nature",
    description: "A unique geological phenomenon where seawater disappears into rock crevices, travels under the island, and emerges 15 days later on the opposite coast at Melissani Lake.",
    howToGetThere: "Located 2 km from Argostoli along the coastal road to Lassi. Accessible by car with parking available.",
    bestTime: "Morning when the light makes it easier to see the water flowing into the sinkholes.",
    images: [
      "https://www.kastra.eu/screen/kefkat.jpg",
      "https://www.kefaloniabyanna.com/wp-content/uploads/2015/07/katavothres-photo.jpg"
    ],
    tip: "There's an old water mill at the site and informational panels explaining the phenomenon. This quick stop combines well with a visit to the nearby Fanari lighthouse."
  },
  {
    id: 22,
    name: "Karavomilos Lake",
    lat: 38.254961,
    lng: 20.629771,
    category: "Nature",
    description: "A small, picturesque freshwater lake fed by underground streams from the Katavothres phenomenon. Peaceful setting with lush surroundings and wildlife.",
    howToGetThere: "Located in Karavomylos village, 2 km northwest of Sami. Easy access with parking nearby.",
    bestTime: "Early morning for the chance to see birds and enjoy the peaceful atmosphere before day-trippers arrive.",
    images: [
      "https://www.shinygreece.com/static/0a35c0a5db87126e72579805a577fed2/a41d1/karavomilos-lake.jpg",
      "https://www.greeka.com/seedo/photos/121/kefalonia-karavomilos-lake-top-1-1280.jpg"
    ],
    tip: "This lake is part of the same underground water system as Melissani and Katavothres. Small rowboats are sometimes available for hire."
  },
  {
    id: 23,
    name: "Kaminia Beach",
    lat: 38.066751,
    lng: 20.773361,
    category: "Beach",
    description: "A secluded sandy beach known for loggerhead turtle nesting. Protected natural environment with crystal-clear waters and minimal development.",
    howToGetThere: "Located 2 km north of Skala. Limited signage, accessed via a dirt track from the main Skala-Poros road.",
    bestTime: "Morning for turtle spotting (from a respectful distance) or late afternoon when most visitors have left.",
    images: [
      "https://amazingkefalonia.com/wp-content/uploads/2024/01/kaminia-kefalonia-1024x576.jpg",
      "https://www.worldbeachguide.com/photos/kaminia-beach-kefalonia.jpg"
    ],
    tip: "This is a protected turtle nesting site, so avoid disturbing any marked nests or approaching turtles. No umbrellas should be placed near marked areas."
  },
  {
    id: 24,
    name: "Agios Gerasimos Monastery",
    lat: 38.166015,
    lng: 20.589161,
    category: "Cultural",
    description: "The most important religious site on Kefalonia, housing the relics of the island's patron saint. Beautiful 18th-century architecture with ornate interior decorations.",
    howToGetThere: "Located in the valley of Omala, 15 km from Argostoli. Well-signposted with good road access and parking.",
    bestTime: "Early to mid-morning to avoid groups or during a religious festival for a cultural experience.",
    images: [
      "https://www.greeka.com/seedo/photos/119/kefalonia-agios-gerasimos-monastery-top-1-1280.jpg",
      "https://insightsgreece.com/wp-content/uploads/2023/05/kefalonias-holy-monastery-of-agios-gerasimos-scaled-1.jpg"
    ],
    tip: "Modest dress is required (shoulders and knees covered). Don't miss the small cave beneath the church where the saint lived as an ascetic."
  },
  {
    id: 25,
    name: "Argostoli Lighthouse",
    lat: 38.19135,
    lng: 20.46784,
    category: "Landmark",
    description: "An elegant circular lighthouse built in 1828 with classic Greek columns, offering beautiful views of Argostoli Bay and the Paliki peninsula.",
    howToGetThere: "Located on a small promontory at the entrance to Argostoli harbor, accessible by car with parking nearby.",
    bestTime: "Sunset for spectacular views across the bay as the sky changes color.",
    images: [
      "https://www.greeka.com/seedo/photos/115/kefalonia-lighthouse-top-1-1280.jpg",
      "https://c8.alamy.com/comp/P17BKP/gibby-lighthouse-at-sunset-argostoli-kefalonia-ionian-islands-greece-P17BKP.jpg"
    ],
    tip: "This area is great for spotting loggerhead turtles in the harbor waters. Bring binoculars for better wildlife viewing."
  }
];

// Kefalonia island bounds for map coordinates
export const islandBounds = {
  minLat: 38.055, 
  maxLat: 38.469,
  minLng: 20.350,
  maxLng: 20.802
};

// Helper function to convert GPS coordinates to SVG coordinates
export const gpsToSvgCoordinates = (lat: number, lng: number, svgWidth: number, svgHeight: number) => {
  const { minLat, maxLat, minLng, maxLng } = islandBounds;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * svgWidth;
  const y = svgHeight - ((lat - minLat) / (maxLat - minLat)) * svgHeight;
  
  return { x, y };
};

// Categories with colors
export const categories = [
  { name: 'Beach', color: '#FF8A65' },
  { name: 'Village', color: '#A5D6A7' },
  { name: 'Historical', color: '#9575CD' },
  { name: 'Nature', color: '#4FC3F7' },
  { name: 'Landmark', color: '#FFD54F' },
  { name: 'Cultural', color: '#F06292' },
];
