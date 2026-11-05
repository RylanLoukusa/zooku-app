// Written content for the site's static pages (scripts/lib/pages.js turns it into HTML).
// Everything here is plain text or simple HTML, so it can be edited without touching the page code.

// One entry per theme in src/shared/generator.js (THEMES). The key must match.
const ECOSYSTEMS = {
  reef: {
    name: 'Coral Reef',
    intro: [
      'Tropical coral reefs grow in warm, clear, shallow seas. They are built over centuries by tiny coral animals that lay down limestone skeletons, and the result is a maze of ledges, caves and branches that gives small fish somewhere to hide.',
      'Reef fish make a living in that maze. Some shelter in a single home for life, some shoal over the reef in the open, and some graze the algae that would otherwise smother the coral. Blacktip reef sharks cruise the shallows around them, picking off fish that stray too far from cover.',
    ],
  },
  savanna: {
    name: 'African Savanna',
    intro: [
      'The East African savanna is open grassland dotted with acacia trees, home to some of the largest herds of grazing animals left on Earth. Zebras, wildebeest and gazelles move across it with the rains, each eating a different part of the grass.',
      'In the dry season, water is scarce, and every animal has to visit the same few watering holes. That makes them the lion’s favourite place to wait. Grazers drink in groups and take turns keeping watch, because the herd is safer than any one animal alone.',
    ],
  },
  night: {
    name: 'Backyard at Night',
    intro: [
      'After dark, a quiet backyard or field edge comes alive with small mammals: mice, voles, shrews and dormice foraging for seeds, insects and berries under cover of night.',
      'Barn owls hunt them almost silently. Their soft-edged feathers muffle the sound of their wings, and their hearing is so sharp they can pinpoint a mouse rustling under the grass. A pile of old logs gives the little animals somewhere to hide, and the owls know to watch it.',
    ],
  },
  ice: {
    name: 'Antarctic Ice Edge',
    intro: [
      'Around Antarctica, the edge of the pack ice is where penguins haul out to rest, then slip back into the sea to feed on krill and fish. Several species share these waters, from the huge emperor to the small, feisty Adélie.',
      'It is also where leopard seals lie in wait. A floating ice floe gives penguins a safe place out of the water, but every trip in or out is a risk, so penguins often hesitate at the edge and enter the water together.',
    ],
  },
  pond: {
    name: 'Lily Pond',
    intro: [
      'A lily pond is a small but crowded world. Each spring, frogs, toads and newts return to the water to breed, laying spawn among the weeds, and their tadpoles and larvae grow up there through the summer.',
      'Grey herons stalk the margins, standing motionless for long minutes before a single fast strike. Lily pads shade the water, keep it cool, and give amphibians a place to rest and snap up passing insects.',
    ],
  },
  jungle: {
    name: 'Rainforest Canopy',
    intro: [
      'High in the rainforests of Central and South America, the canopy is a second world above the forest floor. Monkeys travel, feed and raise their young among the treetops, often without coming down for days.',
      'The harpy eagle, one of the most powerful eagles in the world, hunts them there, flying through gaps in the branches to snatch monkeys and sloths. Fruiting fig trees draw troops together to feed, which brings them into plain view.',
    ],
  },
  outback: {
    name: 'Australian Outback',
    intro: [
      'Australia’s dry interior is a land of red earth, spinifex grass and rocky ranges. Its marsupials, from kangaroos to bilbies, are adapted to heat and drought: many rest in the shade or underground during the day and feed in the cool of the night.',
      'Dingoes are the largest land predators left on the continent, hunting alone or in packs. When the rains stop, billabongs and waterholes become the places every animal has to visit, and the dingoes visit them too.',
    ],
  },
  meadow: {
    name: 'Hedgerow',
    intro: [
      'Hedgerows are lines of shrubs and small trees that divide fields across Britain and much of Europe, some of them hundreds of years old. They give songbirds berries in autumn, insects in summer and thick cover from the weather all year round.',
      'The Eurasian sparrowhawk is built for hunting in exactly this kind of place: short, rounded wings and a long tail let it twist through cover at speed. It often flies low along one side of a hedge and flips over the top to surprise birds feeding on the other.',
    ],
  },
  desert: {
    name: 'North American Desert',
    intro: [
      'The deserts of the American Southwest look empty at midday, but rocks, shrubs and cacti shelter a busy community of lizards. They bask in the morning sun to warm up, hunt or graze, and retreat into shade and crevices when the ground gets too hot.',
      'The greater roadrunner, a ground-dwelling member of the cuckoo family, runs them down on foot. Tall saguaro cacti, found in the Sonoran Desert, give shade, and their old woodpecker holes become homes for many other desert animals.',
    ],
  },
  tundra: {
    name: 'Arctic Tundra',
    intro: [
      'North of the tree line, the Arctic tundra is frozen for most of the year. There are no trees to hide in, so small mammals survive the long winter under the snow, in tunnels close to the ground where the temperature stays far milder than the air above.',
      'Arctic foxes patrol the surface, listening for movement beneath their feet, then leap and dive nose-first through the snow. In years when lemmings are plentiful, foxes raise large litters; when lemmings crash, they range far and wide in search of food.',
    ],
  },
  kelp: {
    name: 'Kelp Forest',
    intro: [
      'Along the cold, rocky coasts of the North Pacific, giant kelp grows from the seabed to the surface, forming tall underwater forests. Crabs, snails, abalone, mussels and sea urchins live among its holdfasts and on the rocks below.',
      'Sea otters are a keystone species here. By eating sea urchins, they stop the urchins from grazing the kelp down to bare rock, which keeps the whole forest, and everything that lives in it, standing.',
    ],
  },
  mountain: {
    name: 'Himalaya',
    intro: [
      'In the Himalaya and the mountains of Central Asia, wild goats and sheep live on steep cliffs and high pastures where few predators can follow. Their hooves and agility let them stand on ledges that look impossible.',
      'The snow leopard can follow. Pale, spotted and almost invisible against rock and snow, it stalks its prey along the ledges and pounces from above. In the short mountain summer, alpine meadows burst into flower and draw the grazers upslope to feed.',
    ],
  },
  swamp: {
    name: 'Southern Swamp',
    intro: [
      'The wetlands of the southeastern United States, such as the Florida Everglades, are slow-moving sheets of water and grass. Wading birds gather here in huge numbers to feed in the shallows and nest in colonies on tree islands.',
      'American alligators rule the water. They are a danger to the birds, but also, oddly, a protector: raccoons and other egg thieves avoid the trees that alligators guard. Sawgrass marshes stretch for miles between the islands.',
    ],
  },
  porch: {
    name: 'Summer Porch at Night',
    intro: [
      'On a warm summer night in North America, a porch light draws moths from all around, and the bats have learned to use it. Big brown bats hunt flying insects by echolocation, and a lit porch is an easy meal.',
      'Many of the moths that turn up are spectacular. Silk moths such as the luna and polyphemus are among the largest moths on the continent, yet as adults they have no working mouth and live for only about a week.',
    ],
  },
  india: {
    name: 'Indian Forest',
    intro: [
      'The forests and grasslands of India and Nepal are home to the Bengal tiger and to several kinds of deer that it hunts, from the tiny barking muntjac to the large sambar.',
      'Deer rely on sharp senses and on alarm calls, from each other and from monkeys and birds, to know when a tiger is near. A tiger usually hunts by stalking close under cover and then rushing its prey. Bamboo thickets offer food for the deer and cover for the hunter.',
    ],
  },
  river: {
    name: 'Salmon River',
    intro: [
      'Every summer and autumn, Pacific salmon return from the ocean to the rivers where they hatched, swimming upstream to spawn and then die. Different species run at different times and to different parts of the river.',
      'Grizzly bears gather at rapids and waterfalls, where salmon have to leap, to catch them. A salmon run feeds bears, eagles and gulls, and the leftover carcasses even fertilise the forest along the banks.',
    ],
  },
};

// What each rule in the generator's pools means, in words. {prey} and {habitat} are filled in per theme.
const RULE_WORDS = {
  school: 'scores extra for each other {preyOne} next to it',
  herd: 'scores extra for each other animal of its own species next to it',
  loner: 'scores a bonus only when no other {preyOne} is next to it',
  nearHab: 'scores a bonus when it sits right beside the {habitat}',
  corner: 'scores a bonus in a corner square',
  edge: 'scores a bonus on an edge square (not a corner)',
  center: 'scores a bonus in the center square',
  flat: 'has no special rule: it simply scores its base points',
};

// The website's own short pages. Headings and paragraphs only.
const ABOUT = [
  ['What Zooku is', [
    'Zooku is a free daily logic puzzle about animals and the places they live. Each day you get a small 3×3 board, five prey animals, one predator and one habitat. Place them all, and the score depends on who ends up next to whom.',
    'The twist is the predator. It scores points for every prey animal it can reach, but those prey are eaten and score nothing. So every puzzle asks one question: is it better to feed the predator or protect the prey? Every day the answer is different, and every puzzle is built so that both plans come close.',
  ]],
  ['Who makes it', [
    'Zooku is an independent project, written, drawn and run by one developer. The puzzles, the illustrations and the field-guide notes are all original to Zooku.',
    'Each day’s puzzle is designed with a puzzle generator and then reviewed by hand before it goes out: the generator checks that the perfect score is rare, that feeding and protecting never tie, and that the losing plan stays within reach of the winning one. Puzzles are scheduled weeks ahead, and a puzzle never changes once it is live.',
  ]],
  ['The animals', [
    'There are 16 scenes, from coral reefs to the Arctic tundra, each with its own predator, five kinds of prey and a habitat. Every animal in the game is a real species, and every card carries a short, true note about how it lives. The <a href="/field-guide/">field guide</a> collects them all.',
    'The rules on each card are loosely inspired by the animal: schooling fish score more together, loners prefer space, and some animals do best next to the habitat they depend on.',
  ]],
];

module.exports = { ECOSYSTEMS, RULE_WORDS, ABOUT };
