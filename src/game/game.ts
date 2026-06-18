import {
    createEngine,
    createSceneContext,
    createDefaultCamera,
    createHemisphericLight,
    loadGltf,
    addToScene,
    attachControl,
    registerScene,
    startEngine,
    EngineContext,
    SceneContext,
} from "@babylonjs/lite";

export class Game {
    public canvas: HTMLCanvasElement;
    public engine: EngineContext;
    public scene: SceneContext;

    constructor(
        canvas: HTMLCanvasElement,
        engine: EngineContext,
        scene: SceneContext
    ) {
        this.canvas = canvas;
        this.engine = engine;
        this.scene = scene;
    }

    public async initialize() {
        addToScene(this.scene, createHemisphericLight([0, 1, 0], 1.0));
        addToScene(this.scene, await loadGltf(this.engine, "https://playground.babylonjs.com/scenes/BoomBox.glb"));

        const cam = createDefaultCamera(this.scene);
        attachControl(cam, this.canvas, this.scene);

        await registerScene(this.scene);
    }

    public async start() {
        if (this.engine) {
            await startEngine(this.engine);
        }
    }
}

export async function createGame(canvas: HTMLCanvasElement): Promise<Game> {
    const engineContext = await createEngine(canvas);
    const scene = createSceneContext(engineContext);
    const game = new Game(canvas, engineContext, scene);
    await game.initialize();
    return game;
}