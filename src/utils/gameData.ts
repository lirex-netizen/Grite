import { NPC, DecorativeObject, GameMapId } from "../types";

export interface GameMap {
  id: GameMapId;
  width: number;
  height: number;
  backgroundColor: string;
  obstacles: { x: number; y: number; width: number; height: number }[];
  npcs: NPC[];
  objects: DecorativeObject[];
}

export const MAPS: Record<GameMapId, GameMap> = {
  HOUSE_INT: {
    id: "HOUSE_INT",
    width: 480,
    height: 320,
    backgroundColor: "#16110f",
    obstacles: [
      { x: 0, y: 0, width: 480, height: 40 },
      { x: 0, y: 0, width: 20, height: 320 },
      { x: 460, y: 0, width: 20, height: 320 },
      { x: 0, y: 300, width: 210, height: 20 },
      { x: 270, y: 300, width: 210, height: 20 },
      
      { x: 154, y: 40, width: 12, height: 90 },
      { x: 154, y: 210, width: 12, height: 90 },
      { x: 314, y: 40, width: 12, height: 90 },
      { x: 314, y: 210, width: 12, height: 90 },
 
      { x: 30, y: 50, width: 50, height: 45 },
      { x: 100, y: 50, width: 30, height: 35 },
      { x: 25, y: 220, width: 60, height: 45 },
      { x: 95, y: 220, width: 45, height: 50 },
      { x: 380, y: 50, width: 60, height: 45 },
      { x: 340, y: 50, width: 30, height: 35 },
      { x: 345, y: 220, width: 55, height: 40 },
    ],
    npcs: [
      {
        id: "MOM",
        name: "Mother (Eleanor)",
        spriteColor: "#af8181",
        x: 232,
        y: 120,
        width: 16,
        height: 24,
        facing: "down",
        faceIndex: 1,
        dialogue: [
          "Leo... you are finally awake.",
          "Mom, when is the carnival starting? I heard the distant music in my sleep.",
          "The Carnival is setting up near the pine woods tonight. I will be going there very soon...",
          "Can I come with you?",
          "No, Leo. It's no place for a child. Look at your father in the other room... his chest is heavy. The damp air is killing him.",
          "Take this wallet. Go straight into town, to Dr. Weaver's pharmacy. Ask him for the dad's lung medicine.",
          "Do not wander into the wet alleys, and do not speak to strangers. Come straight back."
        ],
        solvedDialogue: [
          "Did you get the medicine yet, Leo? Go quickly. Dr. Weaver's Pharmacy is at the east side of town.",
          "Tell your father I'll be back shortly... the carnival wheels are already turning."
        ]
      },
      {
        id: "DAD",
        name: "Father (Thomas)",
        spriteColor: "#8e9191",
        x: 410,
        y: 50,
        width: 16,
        height: 16,
        facing: "up",
        faceIndex: 2,
        dialogue: [
          "*He coughs violently, a wet, rattling gasp echo in the dim room.*",
          "Th-Thomas...? Leo, is that you...?",
          "Dad, I'm going to get your medicine. Mom gave me the coins.",
          "Be careful, my boy... the fog outside... it carries a dark chill. Cover your neck..."
        ],
        solvedDialogue: [
          "*He seems to have fallen into a deep, feverish sleep, mumbling words about lights in the forest.*",
          "Eleanor... don't go out... the tickets are a trap..."
        ]
      },
      {
        id: "SISTER",
        name: "Sister (Clara)",
        spriteColor: "#ad9cb4",
        x: 232,
        y: 190,
        width: 16,
        height: 24,
        facing: "down",
        faceIndex: 3,
        dialogue: [
          "Leo! You're back...",
          "Clara? I got the medicine for Dad. But where is Mother? Her chair is empty...",
          "Mom... she wrapping her black wool shawl and walked out. I begged her to stay, to wait for code medicine...",
          "She looked at me with cold eyes... she said she couldn't take this rotting house any longer. She left for the Carnival.",
          "Left...? But she promised she would help feed Dad his syrup...",
          "She won't be coming back, Leo. She bought a single entry ticket. They don't let you return.",
          "Come, sit by me. Let's cover Father's blankets. The wind outside is screaming."
        ],
        solvedDialogue: [
          "It is just you and me now, Leo. Let us stay inside. Lock the front door.",
          "The carnival lights outside are so bright... but they are freezing cold."
        ]
      }
    ],
    objects: [
      { type: "bed", x: 30, y: 40, width: 50, height: 50, color: "#4f3a3a", detailType: "bed" },
      { type: "bed", x: 390, y: 40, width: 50, height: 40, color: "#2d3330", detailType: "bed" },

      { type: "cabinet", x: 154, y: 40, width: 12, height: 90, color: "#2e1c0c", detailType: "shelf" },
      { type: "cabinet", x: 154, y: 210, width: 12, height: 90, color: "#2e1c0c", detailType: "shelf" },
      
      { type: "cabinet", x: 314, y: 40, width: 12, height: 90, color: "#2e1c0c", detailType: "shelf" },
      { type: "cabinet", x: 314, y: 210, width: 12, height: 90, color: "#2e1c0c", detailType: "shelf" },

      { type: "kitchen", x: 25, y: 200, width: 60, height: 50, color: "#362621", detailType: "stove" },
      { type: "table", x: 95, y: 220, width: 40, height: 30, color: "#4c3228", detailType: "table" },
      { type: "cabinet", x: 100, y: 40, width: 30, height: 35, color: "#3d2b1f", detailType: "shelf" },

      { type: "fireplace", x: 224, y: 40, width: 32, height: 25, color: "#781a1a", detailType: "fireplace" },
      { type: "cabinet", x: 180, y: 40, width: 35, height: 25, color: "#3d2b1f", detailType: "shelf" },
      { type: "television", x: 268, y: 40, width: 30, height: 20, color: "#191919", detailType: "tv" },

      { type: "sofa", x: 345, y: 220, width: 50, height: 40, color: "#1e293b", detailType: "sofa" },
      { type: "desk", x: 340, y: 40, width: 30, height: 30, color: "#2c1d11", detailType: "desk" },

      { type: "carpet", x: 35, y: 95, width: 40, height: 40, color: "#581c1c" },
      { type: "carpet", x: 200, y: 140, width: 80, height: 50, color: "#47242c" },
      { type: "carpet", x: 385, y: 95, width: 55, height: 40, color: "#1e2c22" },
      { type: "carpet", x: 215, y: 290, width: 50, height: 12, color: "#2a1515" },
      
      { type: "window", x: 60, y: 35, width: 25, height: 5, color: "#1e293b", detailType: "window" },
      { type: "window", x: 227, y: 35, width: 25, height: 5, color: "#1e293b", detailType: "window" },
      { type: "window", x: 395, y: 35, width: 25, height: 5, color: "#1e293b", detailType: "window" },
    ]
  },

  TOWN: {
    id: "TOWN",
    width: 2000,
    height: 320,
    backgroundColor: "#07090b",
    obstacles: [
      { x: 0, y: 0, width: 2000, height: 160 },
      { x: 0, y: 300, width: 2000, height: 20 },
      { x: 0, y: 0, width: 20, height: 320 },
      { x: 1980, y: 0, width: 20, height: 320 },

      { x: 80, y: 140, width: 140, height: 50 },
      { x: 300, y: 120, width: 180, height: 75 },
      { x: 550, y: 130, width: 150, height: 60 },
      { x: 800, y: 140, width: 120, height: 50 },
      { x: 1100, y: 110, width: 180, height: 85 },
      { x: 1450, y: 130, width: 200, height: 65 },
      
      { x: 450, y: 230, width: 30, height: 30 },
      { x: 950, y: 220, width: 50, height: 50 },
      { x: 1850, y: 130, width: 40, height: 130 },
    ],
    npcs: [
      {
        id: "TOWN_LADY",
        name: "Amelia (Wet Umbrella)",
        spriteColor: "#3e515b",
        x: 480,
        y: 200,
        width: 16,
        height: 24,
        facing: "right",
        faceIndex: 4,
        dialogue: [
          "It's cold... always raining on Carnival eve.",
          "Every generation, the lights appear in the pine woods, and someone always vanishes.",
          "Your mother... I saw her earlier, cleaning her good coat with a vacant smile on her face.",
          "There's something predatory about that carousel sound, boy. Hurry home."
        ]
      },
      {
        id: "TOWN_GRIM",
        name: "Lyman (Street Sweeper)",
        spriteColor: "#524b42",
        x: 750,
        y: 240,
        width: 16,
        height: 24,
        facing: "left",
        faceIndex: 5,
        dialogue: [
          "Nothing to sweep but coal ash and rain puddles.",
          "You are Thomas's younger child, aren't you? He's coughing up his marrow, poor bloke.",
          "If you buy that green-bottle medicine from Weaver, make sure you don't drop it. It's expensive as blood.",
          "Why are you staring at the gates? They've been locked for decades... yet we hear the call."
        ]
      },
      {
        id: "TOWN_CHILD",
        name: "Pip (Lost Boy)",
        spriteColor: "#8fa382",
        x: 1000,
        y: 210,
        width: 14,
        height: 18,
        facing: "down",
        faceIndex: 6,
        dialogue: [
          "Hey, Leo... do you have a penny?",
          "No? Mom only gave me coins for Dad's sick syrup.",
          "My sister says once you hear the call of the carnival, your heart gets lighter and lighter until you float away...",
          "I think your mother is beautiful. She gave me a gingerbread cookie and said goodbye. Why did she say goodbye?"
        ]
      },
      {
        id: "CARNIVAL_BARKER",
        name: "Shadowy Figure",
        spriteColor: "#1d1d23",
        x: 1820,
        y: 190,
        width: 18,
        height: 26,
        facing: "left",
        faceIndex: 7,
        dialogue: [
          "Step closer, little mortal... can you smell the hot popcorn? Can you hear the call of the calliope?",
          "Mom says the carnival is only for grown-ups.",
          "Heheh... it is for anyone with a heavy heart who wishes to forget.",
          "Your mother has already handed over her ticket. She's sitting on the bright painted panther now.",
          "No! She's supposed to stay...!",
          "Go back to your dusty crib, boy. The show has already begun."
        ]
      }
    ],
    objects: [
      { type: "lightpost", x: 260, y: 150, width: 10, height: 60, color: "#ca8a04", detailType: "lightpost" },
      { type: "lightpost", x: 650, y: 150, width: 10, height: 60, color: "#ca8a04", detailType: "lightpost" },
      { type: "lightpost", x: 920, y: 150, width: 10, height: 60, color: "#ca8a04", detailType: "lightpost" },
      { type: "lightpost", x: 1350, y: 150, width: 10, height: 60, color: "#ca8a04", detailType: "lightpost" },
      { type: "lightpost", x: 1720, y: 150, width: 10, height: 60, color: "#10b981", detailType: "lightpost" },
      
      { type: "tree", x: 40, y: 110, width: 30, height: 70, color: "#1e293b", detailType: "tree" },
      { type: "tree", x: 240, y: 100, width: 35, height: 80, color: "#111827", detailType: "tree" },
      { type: "tree", x: 500, y: 110, width: 30, height: 70, color: "#1e293b", detailType: "tree" },
      { type: "tree", x: 1050, y: 105, width: 40, height: 75, color: "#111827", detailType: "tree" },
      { type: "tree", x: 1400, y: 100, width: 35, height: 80, color: "#1e293b", detailType: "tree" },
      { type: "tree", x: 1680, y: 80, width: 80, height: 110, color: "#060814", detailType: "tree" },

      { type: "sign", x: 110, y: 185, width: 16, height: 8, color: "#78350f", detailType: "sign", text: "LEO'S HOUSE" },
      { type: "sign", x: 1130, y: 170, width: 22, height: 12, color: "#10b981", detailType: "sign", text: "PHARMACY" },
      { type: "sign", x: 1845, y: 145, width: 28, height: 14, color: "#ef4444", detailType: "sign", text: "CARNIVAL GATES" },

      { type: "playground", x: 930, y: 220, width: 60, height: 50, color: "#475569", detailType: "box" },
    ]
  },

  PHARMACY_INT: {
    id: "PHARMACY_INT",
    width: 320,
    height: 240,
    backgroundColor: "#0d1b15",
    obstacles: [
      { x: 0, y: 0, width: 320, height: 50 },
      { x: 0, y: 0, width: 15, height: 240 },
      { x: 305, y: 0, width: 15, height: 240 },
      { x: 0, y: 220, width: 130, height: 20 },
      { x: 190, y: 220, width: 130, height: 20 },

      { x: 30, y: 55, width: 260, height: 40 },
      { x: 30, y: 120, width: 200, height: 35 },
    ],
    npcs: [
      {
        id: "PHARMACIST",
        name: "Dr. Weaver (Apothecary)",
        spriteColor: "#3b7a57",
        x: 130,
        y: 85,
        width: 16,
        height: 24,
        facing: "down",
        faceIndex: 8,
        dialogue: [
          "Welcome to the Apothecary, little child... the damp cold draft is cruel today.",
          "Doctor, I have the money. Mother told me to buy Dad's lung medicine.",
          "Ah, Thomas's mixture. Let me pull the cork off the green jar... *He clinks glasses in the shadow*",
          "Tell your sister Clara to give him two drops of this. No more.",
          "Will he get better...?",
          "*The pharmacist pauses, staring dryly.*",
          "This syrup only buys him time, Leo. It doesn't cure a house made of rotting wood and regrets.",
          "Take the bottle. Run back home before the rain gets heavier. I hear the music playing at the eastern line."
        ],
        solvedDialogue: [
          "Go home, Leo. Your father needs his drops. The wind is picking up.",
          "Keep the bottle upright. Don't lose it to the puddles."
        ]
      }
    ],
    objects: [
      { type: "glasscase", x: 50, y: 50, width: 220, height: 40, color: "#1e3a2f", detailType: "shelf" },
      { type: "counter", x: 30, y: 120, width: 200, height: 35, color: "#5c4033", detailType: "counter" },
      { type: "sign_cross", x: 150, y: 20, width: 16, height: 16, color: "#10b981", detailType: "sign" },
    ]
  }
};