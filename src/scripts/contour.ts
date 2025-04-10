import { BoxGeometry, ShaderMaterial, Vector2, Vector3, Mesh, Scene, WebGLRenderer, OrthographicCamera } from "three";
import contourFrag from "./contour.frag?raw"
import contourVert from "./contour.vert?raw"
import { canvasId } from "./contourConsts"

const darkModeEnabled = () => document.documentElement.classList.contains("dark");
const isDarkInit = darkModeEnabled();

const hexToRgb = (hex: string) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r: string, g: string, b: string) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || "";


    return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`;
}

const getColorVector = (isDark: boolean) => {
    let styles = getComputedStyle(document.documentElement);
    let styleName = isDark ? "--color-dark-background" : "--color-background";
    let style = styles.getPropertyValue(styleName);
    console.log(style);
    if (style.startsWith('#')) {
        style = hexToRgb(style);
    }
    console.log(style);
    const re = /rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    const groups = style.match(re)!;
    console.log(groups);
    return new Vector3(parseInt(groups[1]), parseInt(groups[2]), parseInt(groups[3]))
}


const geometry = new BoxGeometry(100, 100);
const material = new ShaderMaterial({
    fragmentShader: contourFrag,
    vertexShader: contourVert,
    uniforms: {
        iTime: { value: 20 },
        iResolution: {
            value: new Vector2(window.innerWidth, window.innerHeight),
        },
        bgColor: {
            value: getColorVector(isDarkInit)
        },
        colorMult: {
            value: isDarkInit ? 1.0 : -1.0
        }
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


let wasDark = darkModeEnabled();

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

    const isDark = darkModeEnabled();

    if (isDark !== wasDark) {
        material.uniforms["bgColor"].value = getColorVector(isDark);
        if (isDark) {
            material.uniforms["colorMult"].value = 1.0;
        } else {
            material.uniforms["colorMult"].value = -1.0;
        }
        wasDark = isDark;
    }


    if (lastRender && material.uniforms["iTime"].value <= 100) {
        const delta = timestamp - lastRender;
        material.uniforms["iTime"].value += delta / 500;
    }
    lastRender = timestamp;

    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

