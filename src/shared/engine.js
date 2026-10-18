// ===== Zooku engine: animals, habitats, scoring, solver and puzzle design checks =====
// Shared by the game, the generator and the workshop, so they can never disagree about a score.
// Each day: 5 prey + 1 predator in the hand, plus one fixed habitat piece on (or beside) the board.
// Groups are named by the day's theme (e.g. "Fish" and "Shark"); tile colour = group.
// Hunting: the predator gets +N for every prey it reaches; a prey it reaches is EATEN and scores 0.
// The puzzles themselves live in data/calendar.json.
const ANIMALS = {
  // reef
  shark:     { name: 'Blacktip Reef Shark', short: 'Reef Shark', cls: 'Fish', home: 'Tropical reefs', diet: 'Carnivore',
               fact: 'Blacktip reef sharks patrol shallow reefs hunting small fish, often with their fin poking above the water.' },
  clown:     { name: 'Clownfish', short: 'Clownfish', cls: 'Fish', home: 'Tropical reefs', diet: 'Omnivore',
               fact: 'Clownfish shelter among stinging anemones on the reef, protected by a coat of mucus.' },
  damsel:    { name: 'Blue Damselfish', short: 'Damselfish', cls: 'Fish', home: 'Tropical reefs', diet: 'Omnivore',
               fact: 'Damselfish gather in shoals over the reef, and some farm patches of algae they guard from bigger fish.' },
  parrot:    { name: 'Parrotfish', short: 'Parrotfish', cls: 'Fish', home: 'Tropical reefs', diet: 'Herbivore',
               fact: 'Parrotfish crunch coral to get at algae and turn it into sand, hundreds of kilograms a year for a big one.' },
  butterfly: { name: 'Butterflyfish', short: 'Butterflyfish', cls: 'Fish', home: 'Tropical reefs', diet: 'Omnivore',
               fact: 'Many butterflyfish have a fake eyespot near the tail to confuse predators about which way they will flee.' },
  // savanna
  lion:      { name: 'Lion', short: 'Lion', cls: 'Mammal', home: 'Africa', diet: 'Carnivore',
               fact: 'Lions hunt zebra, wildebeest, gazelle and even buffalo, and often wait in ambush near water.' },
  zebra:     { name: 'Plains Zebra', short: 'Zebra', cls: 'Mammal', home: 'Africa', diet: 'Herbivore',
               fact: 'Zebras live in herds, and no two zebras have exactly the same stripe pattern.' },
  gnu:       { name: 'Blue Wildebeest', short: 'Wildebeest', cls: 'Mammal', home: 'Africa', diet: 'Herbivore',
               fact: 'Wildebeest migrate alongside zebras: zebras crop the tall grass and wildebeest eat the shorter shoots underneath.' },
  gazelle:   { name: 'Thomson’s Gazelle', short: 'Gazelle', cls: 'Mammal', home: 'Africa', diet: 'Herbivore',
               fact: 'Thomson’s gazelles can sprint at about 80 km/h (50 mph) and zigzag to shake off a chasing predator.' },
  buffalo:   { name: 'Cape Buffalo', short: 'Buffalo', cls: 'Mammal', home: 'Africa', diet: 'Herbivore',
               fact: 'Cape buffalo herds will turn on lions together and chase them off.' },
  // backyard at night
  owl:       { name: 'Barn Owl', short: 'Barn Owl', cls: 'Bird', home: 'Worldwide', diet: 'Carnivore',
               fact: 'Barn owls live mostly on voles, mice and shrews, and can catch them in total darkness by sound alone.' },
  mouse:     { name: 'Wood Mouse', short: 'Wood Mouse', cls: 'Mammal', home: 'Europe', diet: 'Omnivore',
               fact: 'Wood mice forage mostly at night, and in winter several of them often share one nest.' },
  vole:      { name: 'Field Vole', short: 'Vole', cls: 'Mammal', home: 'Europe', diet: 'Herbivore',
               fact: 'In Britain the field vole is the barn owl’s most important prey.' },
  shrew:     { name: 'Common Shrew', short: 'Shrew', cls: 'Mammal', home: 'Europe', diet: 'Insectivore',
               fact: 'A shrew has to eat every few hours, day and night, or it starves.' },
  dormouse:  { name: 'Hazel Dormouse', short: 'Dormouse', cls: 'Mammal', home: 'Europe', diet: 'Omnivore',
               fact: 'Hazel dormice sleep through the winter, for up to six months.' },
  // antarctic ice edge
  leopard:   { name: 'Leopard Seal', short: 'Leopard Seal', cls: 'Mammal', home: 'Antarctic', diet: 'Carnivore',
               fact: 'Leopard seals patrol the edges of the pack ice and ambush penguins as they slip into or out of the water.' },
  emperor:   { name: 'Emperor Penguin', short: 'Emperor', cls: 'Bird', home: 'Antarctic', diet: 'Carnivore',
               fact: 'Through the Antarctic winter, emperor penguins huddle in groups of thousands, taking turns on the cold outer edge.' },
  adelie:    { name: 'Adélie Penguin', short: 'Adélie', cls: 'Bird', home: 'Antarctic', diet: 'Carnivore',
               fact: 'Adélie penguins build nests from small stones, and often steal stones from their neighbours’ nests.' },
  gentoo:    { name: 'Gentoo Penguin', short: 'Gentoo', cls: 'Bird', home: 'Antarctic', diet: 'Carnivore',
               fact: 'Gentoos are the fastest-swimming penguins, reaching about 36 km/h (22 mph) underwater.' },
  chinstrap: { name: 'Chinstrap Penguin', short: 'Chinstrap', cls: 'Bird', home: 'Antarctic', diet: 'Carnivore',
               fact: 'Named for the thin black band under its chin, the chinstrap nests in huge, noisy colonies on rocky Antarctic islands.' },
  // lily pond
  heron:     { name: 'Grey Heron', short: 'Heron', cls: 'Bird', home: 'Europe, Asia & Africa', diet: 'Carnivore',
               fact: 'Grey herons stand motionless in the shallows for long stretches, then catch fish and frogs with one lightning-fast strike of the bill.' },
  frog:      { name: 'Common Frog', short: 'Frog', cls: 'Amphibian', home: 'Europe', diet: 'Insectivore',
               fact: 'Common frogs crowd into ponds each spring, and one female can lay up to 2,000 eggs in a single clump of spawn.' },
  toad:      { name: 'Common Toad', short: 'Toad', cls: 'Amphibian', home: 'Europe', diet: 'Insectivore',
               fact: 'Common toads walk back to the pond where they hatched to breed, sometimes crossing roads in large numbers.' },
  newt:      { name: 'Smooth Newt', short: 'Newt', cls: 'Amphibian', home: 'Europe', diet: 'Carnivore',
               fact: 'In spring the male smooth newt grows a wavy crest along his back to court females.' },
  treefrog:  { name: 'European Tree Frog', short: 'Tree Frog', cls: 'Amphibian', home: 'Europe', diet: 'Insectivore',
               fact: 'European tree frogs climb reeds and bushes using sticky pads on their toes.' },
  // rainforest canopy
  harpy:     { name: 'Harpy Eagle', short: 'Harpy Eagle', cls: 'Bird', home: 'Central & South America', diet: 'Carnivore',
               fact: 'Harpy eagles snatch sloths and monkeys from the canopy; a female’s talons can be about 12 cm (5 in) long.' },
  tamarin:   { name: 'Cotton-top Tamarin', short: 'Tamarin', cls: 'Mammal', home: 'Colombia', diet: 'Omnivore',
               fact: 'Tamarins live in close family groups, and the whole group helps carry and feed the babies.' },
  howler:    { name: 'Mantled Howler', short: 'Howler', cls: 'Mammal', home: 'Central & South America', diet: 'Herbivore',
               fact: 'A howler monkey’s call can be heard several kilometres away through the forest.' },
  capuchin:  { name: 'White-faced Capuchin', short: 'Capuchin', cls: 'Mammal', home: 'Central & South America', diet: 'Omnivore',
               fact: 'White-faced capuchins rub crushed plants and insects into their fur, which may help keep biting insects away.' },
  spider:    { name: 'Spider Monkey', short: 'Spider Monkey', cls: 'Mammal', home: 'Mexico & Central America', diet: 'Herbivore',
               fact: 'A spider monkey’s tail can hold its whole body weight, and has a bare, grippy patch near the tip.' },
  // outback
  dingo:     { name: 'Dingo', short: 'Dingo', cls: 'Mammal', home: 'Australia', diet: 'Carnivore',
               fact: 'Dingoes hunt alone or in packs, and a pack can bring down a kangaroo bigger than any one of them.' },
  roo:       { name: 'Red Kangaroo', short: 'Kangaroo', cls: 'Mammal', home: 'Australia', diet: 'Herbivore',
               fact: 'Red kangaroos are the largest marsupials. They live in groups called mobs, and single bounds of 8 m (26 ft) or more have been measured.' },
  wallaby:   { name: 'Black-footed Rock-wallaby', short: 'Rock Wallaby', cls: 'Mammal', home: 'Australia', diet: 'Herbivore',
               fact: 'Rock-wallabies have thick, grippy pads on their feet that let them bound up steep rock faces.' },
  wombat:    { name: 'Hairy-nosed Wombat', short: 'Wombat', cls: 'Mammal', home: 'Australia', diet: 'Herbivore',
               fact: 'Wombats leave cube-shaped droppings, which stay put on rocks and logs to mark their patch.' },
  bilby:     { name: 'Greater Bilby', short: 'Bilby', cls: 'Mammal', home: 'Australia', diet: 'Omnivore',
               fact: 'Bilbies rarely drink; they get most of their water from the seeds, bulbs and insects they eat.' },
  // hedgerow
  hawk:      { name: 'Eurasian Sparrowhawk', short: 'Sparrowhawk', cls: 'Bird', home: 'Europe & Asia', diet: 'Carnivore',
               fact: 'Sparrowhawks fly fast and low along hedges, then flip over the top to surprise small birds on the other side.' },
  sparrow:   { name: 'House Sparrow', short: 'Sparrow', cls: 'Bird', home: 'Worldwide', diet: 'Omnivore',
               fact: 'House sparrows feed, roost and dust-bathe together in noisy groups.' },
  robin:     { name: 'European Robin', short: 'Robin', cls: 'Bird', home: 'Europe', diet: 'Omnivore',
               fact: 'Robins defend a territory all year round, and both males and females sing to warn off rivals.' },
  bluetit:   { name: 'Blue Tit', short: 'Blue Tit', cls: 'Bird', home: 'Europe', diet: 'Omnivore',
               fact: 'Blue tits are acrobatic feeders that often hang upside down to pick insects from the tips of twigs.' },
  wren:      { name: 'Eurasian Wren', short: 'Wren', cls: 'Bird', home: 'Europe & Asia', diet: 'Insectivore',
               fact: 'The tiny wren has a remarkably loud song for a bird its size.' },
  // desert
  roadrunner: { name: 'Greater Roadrunner', short: 'Roadrunner', cls: 'Bird', home: 'North American deserts', diet: 'Carnivore',
               fact: 'Roadrunners sprint at about 32 km/h (20 mph) and snatch lizards, insects and even small rattlesnakes.' },
  whiptail:  { name: 'New Mexico Whiptail', short: 'Whiptail', cls: 'Reptile', home: 'North American deserts', diet: 'Insectivore',
               fact: 'New Mexico whiptails are an all-female species: they lay eggs that hatch without any males at all.' },
  hornedlizard: { name: 'Texas Horned Lizard', short: 'Horned Lizard', cls: 'Reptile', home: 'North American deserts', diet: 'Insectivore',
               fact: 'When cornered, a horned lizard can squirt blood from its eyes to put off a predator.' },
  chuckwalla: { name: 'Common Chuckwalla', short: 'Chuckwalla', cls: 'Reptile', home: 'North American deserts', diet: 'Herbivore',
               fact: 'In danger, a chuckwalla wedges itself into a rock crack and gulps air to puff up so it can’t be pulled out.' },
  collared:  { name: 'Collared Lizard', short: 'Collared Lizard', cls: 'Reptile', home: 'North American deserts', diet: 'Carnivore',
               fact: 'Collared lizards can rear up and sprint on their back legs alone.' },
  // arctic tundra
  arcticfox: { name: 'Arctic Fox', short: 'Arctic Fox', cls: 'Mammal', home: 'Arctic tundra', diet: 'Carnivore',
               fact: 'Arctic foxes listen for lemmings moving under the snow, then leap and pounce to break through to them.' },
  lemming:   { name: 'Collared Lemming', short: 'Lemming', cls: 'Mammal', home: 'Arctic tundra', diet: 'Herbivore',
               fact: 'Collared lemmings turn white in winter and grow extra-long front claws for digging through snow.' },
  arctichare: { name: 'Arctic Hare', short: 'Arctic Hare', cls: 'Mammal', home: 'Arctic tundra', diet: 'Herbivore',
               fact: 'Arctic hares dig shelters in the snow, and can bound along on just their back legs.' },
  groundsquirrel: { name: 'Arctic Ground Squirrel', short: 'Ground Squirrel', cls: 'Mammal', home: 'Arctic tundra', diet: 'Omnivore',
               fact: 'Arctic ground squirrels hibernate for more than half the year, and their bodies can cool to just below freezing.' },
  tundravole: { name: 'Tundra Vole', short: 'Tundra Vole', cls: 'Mammal', home: 'Arctic tundra', diet: 'Herbivore',
               fact: 'Tundra voles store roots and grass in underground larders to see them through the winter.' },
  // kelp forest
  otter:     { name: 'Sea Otter', short: 'Sea Otter', cls: 'Mammal', home: 'North Pacific coasts', diet: 'Carnivore',
               fact: 'Sea otters float on their backs and crack shellfish open on stones they carry in a pouch of loose skin under each arm.' },
  urchin:    { name: 'Purple Sea Urchin', short: 'Urchin', cls: 'Invertebrate', home: 'North Pacific coasts', diet: 'Herbivore',
               fact: 'Without sea otters to eat them, purple urchins can graze a kelp forest down to bare rock.' },
  crab:      { name: 'Red Rock Crab', short: 'Rock Crab', cls: 'Invertebrate', home: 'North Pacific coasts', diet: 'Carnivore',
               fact: 'Red rock crabs use their heavy black-tipped claws to crack open snails and clams.' },
  abalone:   { name: 'Red Abalone', short: 'Abalone', cls: 'Invertebrate', home: 'North Pacific coasts', diet: 'Herbivore',
               fact: 'Red abalone are the largest abalone in the world, and clamp to rocks with one huge muscular foot.' },
  mussel:    { name: 'California Mussel', short: 'Mussel', cls: 'Invertebrate', home: 'North Pacific coasts', diet: 'Filter feeder',
               fact: 'California mussels anchor themselves to wave-battered rocks with tough threads called byssus.' },
  // himalaya
  snowleopard: { name: 'Snow Leopard', short: 'Snow Leopard', cls: 'Mammal', home: 'Central Asian mountains', diet: 'Carnivore',
               fact: 'Snow leopards balance on cliffs with their long, thick tails, and wrap them around themselves for warmth.' },
  bharal:    { name: 'Blue Sheep', short: 'Blue Sheep', cls: 'Mammal', home: 'Himalaya', diet: 'Herbivore',
               fact: 'Blue sheep are a favourite prey of snow leopards, and freeze motionless on cliffs to blend in with the rock.' },
  tahr:      { name: 'Himalayan Tahr', short: 'Tahr', cls: 'Mammal', home: 'Himalaya', diet: 'Herbivore',
               fact: 'Himalayan tahr have rubbery pads on their hooves that grip smooth rock like climbing shoes.' },
  markhor:   { name: 'Markhor', short: 'Markhor', cls: 'Mammal', home: 'Central Asian mountains', diet: 'Herbivore',
               fact: 'Markhor are wild goats famous for their huge corkscrew horns, and they even climb trees to reach leaves.' },
  ibex:      { name: 'Siberian Ibex', short: 'Ibex', cls: 'Mammal', home: 'Central Asian mountains', diet: 'Herbivore',
               fact: 'Male Siberian ibex grow sweeping, ridged horns that can be more than a metre long.' },
  // swamp
  gator:     { name: 'American Alligator', short: 'Alligator', cls: 'Reptile', home: 'Southeastern US wetlands', diet: 'Carnivore',
               fact: 'Wading birds often nest in trees above alligators, which keep raccoons away from the eggs.' },
  ibis:      { name: 'White Ibis', short: 'Ibis', cls: 'Bird', home: 'Southeastern US wetlands', diet: 'Carnivore',
               fact: 'White ibises probe the mud with their long, curved red bills and feed in busy flocks.' },
  spoonbill: { name: 'Roseate Spoonbill', short: 'Spoonbill', cls: 'Bird', home: 'Americas wetlands', diet: 'Carnivore',
               fact: 'Roseate spoonbills get their pink colour from the shrimp and other crustaceans they eat.' },
  egret:     { name: 'Great Egret', short: 'Egret', cls: 'Bird', home: 'Worldwide wetlands', diet: 'Carnivore',
               fact: 'Great egrets were once hunted almost to extinction for their lacy plumes, which helped start the bird-protection movement.' },
  woodduck:  { name: 'Wood Duck', short: 'Wood Duck', cls: 'Bird', home: 'North American wetlands', diet: 'Omnivore',
               fact: 'A day after hatching, wood duck ducklings jump from their tree-hole nest, often far above the ground, and bounce off unhurt.' },
  // summer porch at night
  bat:       { name: 'Big Brown Bat', short: 'Brown Bat', cls: 'Mammal', home: 'North America', diet: 'Insectivore',
               fact: 'Big brown bats find insects in the dark by echolocation: they call out and listen for the echoes.' },
  luna:      { name: 'Luna Moth', short: 'Luna Moth', cls: 'Insect', home: 'North America', diet: 'Does not eat',
               fact: 'Adult luna moths have no working mouth: they live for only about a week, just long enough to mate.' },
  rosymaple: { name: 'Rosy Maple Moth', short: 'Rosy Maple', cls: 'Insect', home: 'North America', diet: 'Does not eat',
               fact: 'The fuzzy pink-and-yellow rosy maple moth is one of the smallest silk moths.' },
  polyphemus: { name: 'Polyphemus Moth', short: 'Polyphemus', cls: 'Insect', home: 'North America', diet: 'Does not eat',
               fact: 'Polyphemus moths flash big eyespots on their back wings to startle predators. They are named after a one-eyed giant.' },
  tigermoth: { name: 'Isabella Tiger Moth', short: 'Tiger Moth', cls: 'Insect', home: 'North America', diet: 'Herbivore',
               fact: 'The fuzzy black-and-orange woolly bear caterpillar grows up to be the Isabella tiger moth.' },
  // indian forest
  tiger:     { name: 'Bengal Tiger', short: 'Tiger', cls: 'Mammal', home: 'South Asia', diet: 'Carnivore',
               fact: 'A tiger’s stripes are not just in its fur: they are on its skin too.' },
  chital:    { name: 'Chital', short: 'Chital', cls: 'Mammal', home: 'South Asia', diet: 'Herbivore',
               fact: 'Chital follow langur monkeys to eat the fruit they drop, and listen for their alarm calls.' },
  sambar:    { name: 'Sambar Deer', short: 'Sambar', cls: 'Mammal', home: 'South and Southeast Asia', diet: 'Herbivore',
               fact: 'Sambar stamp their feet and give a loud, honking alarm call when they spot a tiger.' },
  barasingha: { name: 'Barasingha', short: 'Barasingha', cls: 'Mammal', home: 'India and Nepal', diet: 'Herbivore',
               fact: 'Barasingha means “twelve-tined”, after the many points on the stags’ antlers. They are also called swamp deer.' },
  muntjac:   { name: 'Indian Muntjac', short: 'Muntjac', cls: 'Mammal', home: 'South and Southeast Asia', diet: 'Herbivore',
               fact: 'Muntjacs are called barking deer because their alarm call sounds like a dog’s bark.' },
  // salmon river
  grizzly:   { name: 'Grizzly Bear', short: 'Grizzly', cls: 'Mammal', home: 'North America', diet: 'Omnivore',
               fact: 'Grizzlies gather at waterfalls during salmon runs, and some catch leaping fish right out of the air.' },
  sockeye:   { name: 'Sockeye Salmon', short: 'Sockeye', cls: 'Fish', home: 'North Pacific rivers', diet: 'Carnivore',
               fact: 'Sockeye turn bright red with green heads as they swim upriver to spawn.' },
  chinook:   { name: 'Chinook Salmon', short: 'Chinook', cls: 'Fish', home: 'North Pacific rivers', diet: 'Carnivore',
               fact: 'Chinook, also called king salmon, are the largest of the Pacific salmon.' },
  coho:      { name: 'Coho Salmon', short: 'Coho', cls: 'Fish', home: 'North Pacific rivers', diet: 'Carnivore',
               fact: 'Young coho spend a year or more in their home stream before heading out to sea.' },
  pink:      { name: 'Pink Salmon', short: 'Pink Salmon', cls: 'Fish', home: 'North Pacific rivers', diet: 'Carnivore',
               fact: 'Male pink salmon grow a big hump on their backs before spawning, which earns them the nickname “humpies”.' },
};

const LATIN = {
  shark: 'Carcharhinus melanopterus', clown: 'Amphiprion ocellaris', damsel: 'Chrysiptera cyanea', parrot: 'Scaridae', butterfly: 'Chaetodontidae',
  lion: 'Panthera leo', zebra: 'Equus quagga', gnu: 'Connochaetes taurinus', gazelle: 'Eudorcas thomsonii', buffalo: 'Syncerus caffer',
  owl: 'Tyto alba', mouse: 'Apodemus sylvaticus', vole: 'Microtus agrestis', shrew: 'Sorex araneus', dormouse: 'Muscardinus avellanarius',
  leopard: 'Hydrurga leptonyx', emperor: 'Aptenodytes forsteri', adelie: 'Pygoscelis adeliae', gentoo: 'Pygoscelis papua', chinstrap: 'Pygoscelis antarcticus',
  heron: 'Ardea cinerea', frog: 'Rana temporaria', toad: 'Bufo bufo', newt: 'Lissotriton vulgaris', treefrog: 'Hyla arborea',
  harpy: 'Harpia harpyja', tamarin: 'Saguinus oedipus', howler: 'Alouatta palliata', capuchin: 'Cebus capucinus', spider: 'Ateles geoffroyi',
  dingo: 'Canis dingo', roo: 'Osphranter rufus', wallaby: 'Petrogale lateralis', wombat: 'Lasiorhinus latifrons', bilby: 'Macrotis lagotis',
  hawk: 'Accipiter nisus', sparrow: 'Passer domesticus', robin: 'Erithacus rubecula', bluetit: 'Cyanistes caeruleus', wren: 'Troglodytes troglodytes',
  roadrunner: 'Geococcyx californianus', whiptail: 'Aspidoscelis neomexicanus', hornedlizard: 'Phrynosoma cornutum', chuckwalla: 'Sauromalus ater', collared: 'Crotaphytus collaris',
  arcticfox: 'Vulpes lagopus', lemming: 'Dicrostonyx groenlandicus', arctichare: 'Lepus arcticus', groundsquirrel: 'Urocitellus parryii', tundravole: 'Microtus oeconomus',
  otter: 'Enhydra lutris', urchin: 'Strongylocentrotus purpuratus', crab: 'Cancer productus', abalone: 'Haliotis rufescens', mussel: 'Mytilus californianus',
  snowleopard: 'Panthera uncia', bharal: 'Pseudois nayaur', tahr: 'Hemitragus jemlahicus', markhor: 'Capra falconeri', ibex: 'Capra sibirica',
  gator: 'Alligator mississippiensis', ibis: 'Eudocimus albus', spoonbill: 'Platalea ajaja', egret: 'Ardea alba', woodduck: 'Aix sponsa',
  bat: 'Eptesicus fuscus', luna: 'Actias luna', rosymaple: 'Dryocampa rubicunda', polyphemus: 'Antheraea polyphemus', tigermoth: 'Pyrrharctia isabella',
  tiger: 'Panthera tigris tigris', chital: 'Axis axis', sambar: 'Rusa unicolor', barasingha: 'Rucervus duvaucelii', muntjac: 'Muntiacus muntjak',
  grizzly: 'Ursus arctos horribilis', sockeye: 'Oncorhynchus nerka', chinook: 'Oncorhynchus tshawytscha', coho: 'Oncorhynchus kisutch', pink: 'Oncorhynchus gorbuscha',
};
Object.keys(LATIN).forEach(k => { if (ANIMALS[k]) ANIMALS[k].latin = LATIN[k]; });

const HABITATS = {
  coral:  { name: 'Coral Reef', short: 'Coral Reef',
            fact: 'Coral reefs cover less than 1% of the ocean floor but shelter about a quarter of all sea species.' },
  water:  { name: 'Watering Hole', short: 'Watering Hole',
            fact: 'In the dry season, predators and prey drink at the same watering holes.' },
  logs:   { name: 'Log Pile', short: 'Log Pile',
            fact: 'Log piles shelter mice, voles and shrews, and the owls that hunt them know it.' },
  floe:   { name: 'Ice Floe', short: 'Ice Floe',
            fact: 'Ice floes are flat sheets of floating sea ice. Penguins haul out on them to rest, and leopard seals wait at their edges.' },
  lily:   { name: 'Lily Pads', short: 'Lily Pads',
            fact: 'Lily pads shade the water and give frogs a place to rest and snap up insects.' },
  fig:    { name: 'Strangler Fig', short: 'Fig Tree',
            fact: 'Rainforest figs fruit at different times through the year, so they feed monkeys and birds when little else is ripe.' },
  billabong: { name: 'Billabong', short: 'Billabong',
            fact: 'A billabong is a pool left behind when a river changes course or dries up; in a drought it draws animals from far around.' },
  hedge:  { name: 'Hedgerow', short: 'Hedgerow',
            fact: 'Hedgerows give small birds cover from hawks and act as green corridors between fields.' },
  saguaro: { name: 'Saguaro Cactus', short: 'Saguaro',
            fact: 'A saguaro can live for more than 150 years, and old woodpecker holes in its trunk become homes for other desert animals.' },
  snowdrift: { name: 'Snowdrift', short: 'Snowdrift',
            fact: 'Deep snow works like a blanket: underneath it, lemmings and voles stay active all winter in tunnels close to the ground.' },
  kelp:   { name: 'Giant Kelp', short: 'Giant Kelp',
            fact: 'Giant kelp can grow up to about half a metre a day, forming tall underwater forests full of life.' },
  alpine: { name: 'Alpine Meadow', short: 'Alpine Meadow',
            fact: 'In the short mountain summer, high meadows burst into flower, and wild goats and sheep climb up to graze them.' },
  sawgrass: { name: 'Sawgrass Marsh', short: 'Sawgrass',
            fact: 'Sawgrass has tiny saw-like teeth along its blades and covers huge stretches of the Everglades.' },
  porchlight: { name: 'Porch Light', short: 'Porch Light',
            fact: 'Moths circle bright lights because the glare confuses how they keep themselves level in flight, and bats come to feed on them.' },
  bamboo: { name: 'Bamboo Grove', short: 'Bamboo',
            fact: 'Some bamboo can grow almost a metre in a single day, making it one of the fastest-growing plants on Earth.' },
  waterfall: { name: 'Waterfall', short: 'Waterfall',
            fact: 'Salmon return to the stream where they hatched to spawn, leaping up waterfalls along the way.' },
};

// Tile helpers
const Prey = (a, base, rule, reach = 'next') => ({ kind: 'animal', role: 'prey', a, base, rule, reach });
const Pred = (a, base, n, reach = 'next') => ({ kind: 'animal', role: 'pred', a, base, rule: { t: 'eats', n }, reach });
const Hab = (h, eff, reach = 'around') => ({ kind: 'habitat', h, eff, reach });

// ----- helpers -----
const DIRS = { next: [[-1, 0], [1, 0], [0, -1], [0, 1]],
               around: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] };
const key = (r, c) => r + ',' + c;

function info(tile) { return tile.kind === 'animal' ? ANIMALS[tile.a] : HABITATS[tile.h]; }
const isRole = (tile, role) => tile.kind === 'animal' && (role === 'any' || tile.role === role);
const eatsIt = (pred, prey) => pred.kind === 'animal' && pred.role === 'pred' && prey.kind === 'animal' && prey.role === 'prey';
const reachWord = r => r === 'around' ? 'around it' : 'next to it';
const groupName = (puzzle, role, one) => role === 'any' ? 'every animal' : (one && puzzle.groups[role + 'One']) || puzzle.groups[role];
function habitatOf(puzzle) {
  const f = (puzzle.fixed || []).find(x => x.tile.kind === 'habitat');
  if (f) return f.tile;
  const b = (puzzle.border || []).find(x => x.tile.kind === 'habitat');
  return b ? b.tile : null;
}

function ruleText(tile, puzzle) {
  const G = (role, one) => groupName(puzzle, role, one);
  if (tile.kind === 'habitat') {
    const e = tile.eff;
    const who = e.role === 'any' ? 'every animal' : e.role === 'pred' ? 'the ' + G('pred') : G('prey');
    return (e.t === 'mult' ? '×' + e.v : '+' + e.v) + ' to ' + who + ' ' + reachWord(tile.reach);
  }
  const r = tile.rule;
  const prey1 = G('prey', true);
  switch (r.t) {
    case 'flat': return 'No special rule';
    case 'eats': return '+' + r.n + ' per ' + prey1 + ' ' + (tile.reach === 'around' ? 'around it' : 'next to it') + ', and eats it';
    case 'school': return '+' + r.n + ' per other ' + prey1 + ' ' + reachWord(tile.reach);
    case 'herd': return '+' + r.n + ' per other ' + ANIMALS[tile.a].short + ' ' + reachWord(tile.reach);
    case 'loner': return '+' + r.n + ' if no other ' + prey1 + ' is ' + reachWord(tile.reach);
    case 'nearHab': { const h = habitatOf(puzzle); return '+' + r.n + ' next to the ' + (h ? info(h).short : 'habitat'); }
    case 'position': return '+' + r.n + (r.where === 'corner' ? ' in a corner' : r.where === 'edge' ? ' on an edge (not a corner)' : ' in the center');
  }
  return '';
}

// species keys of the predators that can eat this tile
function predatorsOf(puzzle, tile) {
  if (tile.kind !== 'animal' || tile.role !== 'prey') return [];
  const all = puzzle.hand.concat((puzzle.border || []).map(b => b.tile), (puzzle.fixed || []).map(f => f.tile));
  return [...new Set(all.filter(t => eatsIt(t, tile)).map(t => t.a))];
}

function borderCells(b) {
  const out = [];
  for (let i = b.from; i <= b.to; i++) {
    if (b.side === 'left') out.push([i, -1]);
    if (b.side === 'right') out.push([i, 3]);
    if (b.side === 'top') out.push([-1, i]);
    if (b.side === 'bottom') out.push([3, i]);
  }
  return out;
}
const fixedCells = puzzle => (puzzle.fixed || []).map(f => f.at[0] * 3 + f.at[1]);
const rockCells = puzzle => puzzle.rocks.map(([r, c]) => r * 3 + c);
const openCells = puzzle => { const x = new Set(rockCells(puzzle).concat(fixedCells(puzzle))); return [...Array(9).keys()].filter(i => !x.has(i)); };

// placement: array(9) of hand index or null (cell index = r*3+c)
// returns { total, items: [{cell, idx, score, eaten, lines}] }
// each line: { label, v (points) | m (multiplier) | eaten, g? (group label for the score breakdown, e.g. 'Eats Songbird') }
function score(puzzle, placement) {
  const occ = new Map();
  const ents = [];
  placement.forEach((idx, cell) => {
    if (idx == null) return;
    const r = Math.floor(cell / 3), c = cell % 3;
    const ent = { tile: puzzle.hand[idx], idx, cells: [[r, c]], scenery: false, cell };
    occ.set(key(r, c), ent); ents.push(ent);
  });
  (puzzle.fixed || []).forEach((f, fi) => {
    const ent = { tile: f.tile, idx: 'f' + fi, cells: [f.at], scenery: true };
    occ.set(key(f.at[0], f.at[1]), ent); ents.push(ent);
  });
  (puzzle.border || []).forEach((b, bi) => {
    const ent = { tile: b.tile, idx: 'b' + bi, cells: borderCells(b), scenery: true };
    ent.cells.forEach(([r, c]) => occ.set(key(r, c), ent)); ents.push(ent);
  });
  const reached = (ent) => {
    const set = new Set();
    ent.cells.forEach(([r, c]) => DIRS[ent.tile.reach].forEach(([dr, dc]) => {
      const e = occ.get(key(r + dr, c + dc));
      if (e && e !== ent) set.add(e);
    }));
    return [...set];
  };
  const reachMap = new Map(ents.map(e => [e, reached(e)]));

  const items = [];
  let total = 0;
  ents.forEach(ent => {
    if (ent.scenery || ent.tile.kind !== 'animal') return;
    const t = ent.tile, rule = t.rule;
    const [r, c] = ent.cells[0];
    const near = reachMap.get(ent);
    const nearWord = t.reach === 'around' ? 'Near ' : 'Next to ';
    const eaters = ents.filter(p => eatsIt(p.tile, t) && reachMap.get(p).includes(ent));
    if (eaters.length) {
      items.push({ cell: ent.cell, idx: ent.idx, score: 0, eaten: true,
                   lines: [{ label: 'Eaten by ' + [...new Set(eaters.map(p => info(p.tile).short))].join(' and '), eaten: true }] });
      return;
    }
    const lines = [{ label: 'Base', v: t.base }];
    let add = 0, mult = 1;
    if (rule.t === 'eats') {
      near.filter(e => eatsIt(t, e.tile)).forEach(e => { add += rule.n; lines.push({ label: 'Eats ' + info(e.tile).short, v: rule.n, g: 'Eats ' + groupName(puzzle, 'prey', true) }); });
    } else if (rule.t === 'school') {
      near.filter(e => isRole(e.tile, 'prey')).forEach(e => { add += rule.n; lines.push({ label: nearWord + info(e.tile).short, v: rule.n, g: nearWord + groupName(puzzle, 'prey', true) }); });
    } else if (rule.t === 'herd') {
      near.filter(e => e.tile.kind === 'animal' && e.tile.a === t.a).forEach(e => { add += rule.n; lines.push({ label: nearWord + 'another ' + info(e.tile).short, v: rule.n, g: nearWord + info(e.tile).short }); });
    } else if (rule.t === 'loner') {
      if (!near.some(e => isRole(e.tile, 'prey'))) { add += rule.n; lines.push({ label: 'On its own', v: rule.n }); }
    } else if (rule.t === 'nearHab') {
      const hits = DIRS.next.map(([dr, dc]) => occ.get(key(r + dr, c + dc))).filter(e => e && e.tile.kind === 'habitat');
      if (hits.length) { add += rule.n; lines.push({ label: 'Next to ' + info(hits[0].tile).short, v: rule.n }); }
    } else if (rule.t === 'position') {
      const corner = (r === 0 || r === 2) && (c === 0 || c === 2);
      const center = r === 1 && c === 1;
      const ok = rule.where === 'corner' ? corner : rule.where === 'center' ? center : (!corner && !center);
      if (ok) { add += rule.n; lines.push({ label: rule.where === 'corner' ? 'In a corner' : rule.where === 'edge' ? 'On an edge' : 'In the center', v: rule.n }); }
    }
    ents.filter(h => h.tile.kind === 'habitat' && reachMap.get(h).includes(ent) && isRole(t, h.tile.eff.role))
        .forEach(h => {
          if (h.tile.eff.t === 'add') { add += h.tile.eff.v; lines.push({ label: info(h.tile).short, v: h.tile.eff.v }); }
          else { mult *= h.tile.eff.v; lines.push({ label: info(h.tile).short, m: h.tile.eff.v }); }
        });
    const s = Math.max(0, t.base + add) * mult;
    total += s;
    items.push({ cell: ent.cell, idx: ent.idx, score: s, eaten: false, lines });
  });
  return { total, items };
}

// Walk every distinct layout. visit(placement) is called for each one.
function eachLayout(puzzle, visit) {
  const open = openCells(puzzle);
  const groups = new Map();
  puzzle.hand.forEach((t, i) => { const s = JSON.stringify(t); if (!groups.has(s)) groups.set(s, []); groups.get(s).push(i); });
  const kinds = [...groups.values()];
  const counts = kinds.map(k => k.length);
  let empties = open.length - puzzle.hand.length;
  const placement = Array(9).fill(null);
  const rec = (pos) => {
    if (pos === open.length) { visit(placement); return; }
    const cell = open[pos];
    for (let k = 0; k < kinds.length; k++) {
      if (!counts[k]) continue;
      counts[k]--; placement[cell] = kinds[k][counts[k]];
      rec(pos + 1);
      placement[cell] = null; counts[k]++;
    }
    if (empties > 0) { empties--; rec(pos + 1); empties++; }
  };
  rec(0);
}

function solve(puzzle) {
  let best = -1, bestPl = null, layouts = 0;
  eachLayout(puzzle, pl => {
    layouts++;
    const s = score(puzzle, pl).total;
    if (s > best) { best = s; bestPl = pl.slice(); }
  });
  return { best, placement: bestPl, layouts };
}

// ----- puzzle design checks (used when making puzzles, not during play) -----
// Both plans must be close: the best "protect" layout (nothing eaten) and the best "feed" layout
// (the predator eats at least one) must each reach at least CLOSE of the perfect score.
const CLOSE = 0.85;
function checkPuzzle(puzzle) {
  const problems = [];
  const prey = puzzle.hand.filter(t => t.role === 'prey').length, pred = puzzle.hand.filter(t => t.role === 'pred').length;
  if (puzzle.hand.length !== 6 || prey !== 5 || pred !== 1) problems.push(`Hand must be 5 ${puzzle.groups.prey} + 1 ${puzzle.groups.pred} (has ${prey} + ${pred})`);
  if (puzzle.rocks.length < 1 || puzzle.rocks.length > 2) problems.push(`${puzzle.rocks.length} rocks (must be 1 or 2)`);
  if (!habitatOf(puzzle)) problems.push('No fixed habitat piece');
  if (puzzle.hand.filter(t => t.rule.t === 'flat').length > 1) problems.push('More than one tile with no rule');
  let best = -1, protect = -1, feed = -1, perfectCount = 0, total = 0, eatenAtBest = null;
  eachLayout(puzzle, pl => {
    const sc = score(puzzle, pl); total++;
    const eaten = sc.items.filter(it => it.eaten).length;
    if (sc.total > best) { best = sc.total; perfectCount = 0; eatenAtBest = new Set(); }
    if (sc.total === best) { perfectCount++; eatenAtBest.add(eaten); }
    if (eaten === 0 && sc.total > protect) protect = sc.total;
    if (eaten > 0 && sc.total > feed) feed = sc.total;
  });
  const loser = Math.min(protect, feed);
  if (loser < CLOSE * best) problems.push(`The losing plan is too far behind (${loser} vs ${best}), so the answer is obvious`);
  if (protect === feed) problems.push('Feeding and protecting tie');
  if (perfectCount / total > 0.01) problems.push(`Too many perfect layouts (${perfectCount} of ${total})`);
  return { ok: problems.length === 0, problems, perfect: best, protect, feed, perfectCount, layouts: total,
           eatenAtBest: [...eatenAtBest].sort(), winner: feed > protect ? 'feed' : 'protect' };
}

function gradeFor(score, perfect) {
  if (score >= perfect) return 'A+';
  const p = score / perfect;
  if (p >= 0.9) return 'A';
  if (p >= 0.8) return 'B';
  if (p >= 0.7) return 'C';
  if (p >= 0.6) return 'D';
  return 'F';
}

const ZK = { ANIMALS, HABITATS, score, solve, checkPuzzle, gradeFor, ruleText, info, borderCells, DIRS,
             predatorsOf, groupName, openCells, fixedCells, habitatOf, eachLayout, Prey, Pred, Hab };
if (typeof module !== 'undefined') module.exports = ZK;
if (typeof window !== 'undefined') window.ZK = ZK;
