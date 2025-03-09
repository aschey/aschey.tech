import { BoxGeometry, ShaderMaterial, Vector2, Mesh, Scene, WebGLRenderer, OrthographicCamera } from "three";
import contourFrag from "./contour.frag?raw"
import contourVert from "./contour.vert?raw"
import { canvasId } from "./contourConsts"


const geometry = new BoxGeometry(100, 100);
const material = new ShaderMaterial({
    fragmentShader: contourFrag,
    vertexShader: contourVert,
    uniforms: {
        iTime: { value: 20 },
        iResolution: {
            value: new Vector2(window.innerWidth, window.innerHeight),
        },
    },
});
const mesh = new Mesh(geometry, material);
const scene = new Scene();
scene.add(mesh);
const canvas = document.getElementById(canvasId)!;
const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
const camera = new OrthographicCamera();
let lastRender: DOMHighResTimeStamp | undefined = undefined;
let devicePixelRatio = window.devicePixelRatio;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const animate = (timestamp: DOMHighResTimeStamp) => {
    if (window.devicePixelRatio != devicePixelRatio) {
        renderer.setPixelRatio(window.devicePixelRatio);
        devicePixelRatio = window.devicePixelRatio;
    }
    if (window.innerWidth != innerWidth || window.innerHeight != innerHeight) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        innerWidth = window.innerWidth;
        innerHeight = window.innerHeight;
    }

    material.uniforms["iResolution"].value.x = window.innerWidth;
    material.uniforms["iResolution"].value.y = window.innerHeight;
    if (lastRender) {
        const delta = timestamp - lastRender;
        material.uniforms["iTime"].value += delta / 500;
    }
    lastRender = timestamp;

    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

