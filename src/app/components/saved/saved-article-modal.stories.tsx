import type { Meta, StoryObj } from "@storybook/react-vite";

import { useEffect } from "react";

import { useAppDispatch } from "~/hooks/useStore";
import { add, remove } from "~/features/saved/savedSlice";

import SavedArticleModal from "./saved-article-modal";

const savedArticles = [
  {
    title: "Pico Paraná",
    extract:
      "Pico Paraná is the highest mountain in the Brazilian state of Paraná and in all Southern Brazil. It is composed of granite and gneiss. It was discovered by German explorer Reinhard Maack.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/PicoParana2006.jpg/960px-PicoParana2006.jpg",
  },
  {
    title: "David Sani",
    extract:
      "David Giuseppe Sani (1828–1914) was an Italian painter, mainly of genre subjects.\nHe was born and resident in Florence, which was part of the Grand Duchy of Tuscany until he was about 32. Among his works: La vocazione della Musica; La ricreazione; exhibited in Florence in 1882.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/David_sani%2C_ritratto_di_mario_foresi.jpg/960px-David_sani%2C_ritratto_di_mario_foresi.jpg",
  },
  {
    title: "Nolan North filmography",
    extract: "This is the filmography of American actor Nolan North.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Nolan_North_SDCC_2019_%2848378697517%29_%28cropped%29.jpg/960px-Nolan_North_SDCC_2019_%2848378697517%29_%28cropped%29.jpg",
  },
  {
    title: "Santo Stefano di Cadore",
    extract:
      "Santo Stefano di Cadore is a town in the province of Belluno, in the northern Italian region of Veneto.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ciesa.jpg/960px-Ciesa.jpg",
  },
  {
    title: "McLaren MP4-22",
    extract:
      "The McLaren MP4-22 is a Formula One racing car that was constructed by the Vodafone McLaren Mercedes team to compete in the 2007 Formula One World Championship. The chassis was designed by Paddy Lowe, Neil Oatley, Pat Fry, Mike Coughlan and Simon Lacey, with Andy Cowell and Mario Illien designing the bespoke Mercedes-Benz engine. The car was revealed in testing at Circuit de Valencia in Spain on 15 January 2007, and was driven by double World Champion Fernando Alonso and debutant Lewis Hamilton.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Lewis_Hamilton_2007.jpg/960px-Lewis_Hamilton_2007.jpg",
  },
  {
    title: "Stanhopea cirrhata",
    extract:
      "Stanhopea cirrhata is a species of orchid endemic to Central America (Costa Rica, Honduras, Nicaragua and Panama).",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Stanhopea_cirrhata_Orchi_001.jpg/960px-Stanhopea_cirrhata_Orchi_001.jpg",
  },
  {
    title: "2003 London Champ Car Trophy",
    extract:
      "The 2003 London Champ Car Trophy was a Championship Auto Racing Teams (CART) motor race held on 5 May 2003 at the Brands Hatch Indy Circuit in West Kingsdown, Kent, England in front of a crowd of just under 40,000 spectators. It was the fourth round of the 2003 CART season, the first American open wheel car race at the track since 1978, and the first of two European races of the season. Sébastien Bourdais of the Newman/Haas Racing team won the 165-lap race after he started from the second position.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brands_Hatch_Indy_2003.svg/960px-Brands_Hatch_Indy_2003.svg.png",
  },
  {
    title: "Keiferia lycopersicella",
    extract:
      "Keiferia lycopersicella, the tomato pinworm,  is a moth of the family Gelechiidae. It is found in warm areas in Mexico, California, Texas, Georgia, Florida, Hawaii, Cuba, Hispaniola and the Bahamas. It has also been reported from greenhouses in Delaware, Mississippi, Missouri, Pennsylvania and Virginia.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Keiferia_lycopersicella_1327086.jpg/960px-Keiferia_lycopersicella_1327086.jpg",
  },
  {
    title: "Draco fimbriatus",
    extract:
      "Draco fimbriatus, the fringed flying dragon or crested gliding lizard, is a species of agamid lizard. It is found in Malaysia, Indonesia, the Philippines, and Thailand.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Draco_fimbriatus_60478189.jpg/960px-Draco_fimbriatus_60478189.jpg",
  },
  {
    title: "Sogn og Fjordane",
    extract:
      'Sogn og Fjordane (Urban East Norwegian: [ˈsɔŋn ɔ ˈfjûːrɑnə] ; literally "Parish and the Fjords") was a county in western Norway, from 1 January 1919 to 31 December 2019, after it was merged to become part of Vestland county. Bordering previous counties Møre og Romsdal, Oppland, Buskerud, and Hordaland, the county administration was in the village of Hermansverk in Leikanger municipality.  The largest town in the county was Førde.',
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Aurlandsfjord_%2826674071245%29.jpg/960px-Aurlandsfjord_%2826674071245%29.jpg",
  },
  {
    title: "Charlois",
    extract:
      "Charlois (Dutch pronunciation: [ˈɕaːrloːs]) is a neighbourhood of the Dutch city of Rotterdam. It is located on the south bank of the Nieuwe Maas.\n\nCharlois used to be a separate municipality until 1895, when it became part of Rotterdam.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Rotterdamse_wijken-oud-charlois.PNG/600px-Rotterdamse_wijken-oud-charlois.PNG",
  },
  {
    title: "Acyrthosiphon pisum",
    extract:
      "Acyrthosiphon pisum, commonly known as the pea aphid (and colloquially known as the green dolphin, pea louse, and clover louse), is a sap-sucking insect in the family Aphididae. It feeds on several species of legumes (plant family Fabaceae) worldwide, including forage crops, such as pea, clover, alfalfa, and broad bean, and ranks among the aphid species of major agronomical importance. The pea aphid is a model organism for biological study whose genome has been sequenced and annotated.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Acyrthosiphon_pisum_%28pea_aphid%29-PLoS.jpg/600px-Acyrthosiphon_pisum_%28pea_aphid%29-PLoS.jpg",
  },
  {
    title: "Turris burroensis",
    extract:
      "Turris burroensis is an extinct species of sea snail, a marine gastropod mollusk in the family Turridae, the turrids.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Turris_burroensis_Nelson%2C_1925.jpeg/960px-Turris_burroensis_Nelson%2C_1925.jpeg",
  },
  {
    title: "Ore's theorem",
    extract:
      "Ore's theorem is a result in graph theory proved in 1960 by Norwegian mathematician Øystein Ore. It gives a sufficient condition for a graph to be Hamiltonian, essentially stating that a graph with sufficiently many edges must contain a Hamilton cycle. Specifically, the theorem considers the sum of the degrees of pairs of non-adjacent vertices: if every such pair has a sum that at least equals the total number of vertices in the graph, then the graph is Hamiltonian.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ore_theorem_example.svg/600px-Ore_theorem_example.svg.png",
  },
  {
    title: "Royal Hippodrome Theatre",
    extract:
      "The Royal Hippodrome Theatre is a theatre in Eastbourne which dates back to 1883, making it the oldest theatre in the town. It was designed and built for the theatre manager and impresario George Beaumont Loveday by the eminent theatre architect C J Phipps. The venue has been host to one of the longest running summer seasons in the country for several years, opening in April and closing in October.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/TheRoyalHippodrome2018.jpg/600px-TheRoyalHippodrome2018.jpg",
  },
  {
    title: "Seven Seas Lagoon",
    extract:
      "The Seven Seas Lagoon is an artificial lake at the Walt Disney World Resort in Bay Lake, Florida, near Orlando. Located south of the Magic Kingdom theme park, the Seven Seas Lagoon serves as a natural buffer between the Magic Kingdom and its parking lot and connects with the adjacent Bay Lake. The lake reaches a depth of 14 feet (4.3 m).",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Magic_Kingdom_-_Castle_from_Lagoon.jpg/960px-Magic_Kingdom_-_Castle_from_Lagoon.jpg",
  },
];

const meta = {
  title: "Organisms/Saved Article Modal",
  component: SavedArticleModal,
} satisfies Meta<typeof SavedArticleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

// TODO: Use a mocked provider when testing
export const Default: Story = {
  args: {
    open: true,
    setModalActive: () => console.log("modal closed"),
  },
  decorators: [
    (Story) => {
      const dispatch = useAppDispatch();

      // Set mocked state
      useEffect(() => {
        for (const a of savedArticles) {
          dispatch(remove(a));
        }

        for (const a of savedArticles) {
          dispatch(add(a));
        }
      }, []);

      return <Story />;
    },
  ],
};

export const Empty: Story = {
  args: {
    open: true,
    setModalActive: () => console.log("modal closed"),
  },
  decorators: [
    (Story) => {
      const dispatch = useAppDispatch();

      // Set mocked state
      useEffect(() => {
        for (const a of savedArticles) {
          dispatch(remove(a));
        }
      }, []);

      return <Story />;
    },
  ],
};
