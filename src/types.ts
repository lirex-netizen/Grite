export interface Position {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type GameMapId = "HOUSE_INT" | "TOWN" | "PHARMACY_INT";

export type QuestStep =
  | "WAKE_UP"
  | "TALK_MOM"
  | "GET_MEDICINE"
  | "RETURN_HOME"
  | "READ_BOOK"
  | "CUTSCENE"
  | "SISTER_VISIT"
  | "LOCK_THE_DOORS"
  | "WINDOW_PEER"
  | "EPILOGUE"
  | "COMPLETED";

export interface NPC {
  id: string;
  name: string;
  spriteColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
  dialogue: string[];
  solvedDialogue?: string[];
  faceIndex: number;
  facing: "up" | "down" | "left" | "right";
}

export interface InteractionVolume {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  prompt: string;
  action: () => void;
}

export interface DecorativeObject {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  borderColor?: string;
  detailType?: "bed" | "table" | "tv" | "shelf" | "counter" | "stove" | "sofa" | "window" | "car" | "lightpost" | "trash" | "box" | "tree" | "sign" | "fireplace" | "desk";
  text?: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
}

export interface GameState {
  currentMap: GameMapId;
  questStep: QuestStep;
  playerPos: Position;
  playerFacing: "up" | "down" | "left" | "right";
  isMoving: boolean;
  hasMedicine: boolean;
  hasMoney: boolean;
  soundEnabled: boolean;
}