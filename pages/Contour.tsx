import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useRef } from 'react';

export const Contour: React.FC<{}> = () => {
  const ref = useRef<THREE.ShaderMaterial>(null!);

  useFrame((_, delta) => {
    ref.current.uniforms['iResolution'].value.x = window.innerWidth;
    ref.current.uniforms['iResolution'].value.y = window.innerHeight;
    ref.current.uniforms['iTime'].value += delta;
  });

  const shader = `
  varying vec3 Normal;
    uniform float iTime;
    uniform vec3 iResolution;

  float wave(float x, float y) 
{
    return sin(10.0*x+10.0*y) / 5.0 +
           sin(20.0*x+15.0*y) / 3.0 +
           sin(4.0*x+10.0*y) / -4.0 +
           sin(y) / 2.0 +
           sin(x*x*y*20.0) + 
           sin(x * 20.0 + 4.0) / 5.0 +
           sin(y * 30.0) / 5.0 + 
    	   sin(x) / 4.0; 
    
}

vec2 hash( vec2 p ) // replace this by something better
{
	p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}



float noise( in vec2 p )
{
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;

	vec2  i = floor( p + (p.x+p.y)*K1 );
    vec2  a = p - i + (i.x+i.y)*K2;
    float m = step(a.y,a.x); 
    vec2  o = vec2(m,1.0-m);
    vec2  b = a - o + K2;
	vec2  c = a - 1.0 + 2.0*K2;
    vec3  h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	vec3  n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot( n, vec3(70.0) );
}

float fractalNoise(in vec2 uv)
{
    uv *= 5.0;
    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    float f  = 0.5000*noise( uv ); uv = m*uv;
    f += 0.2500*noise( uv ); uv = m*uv;
    f += 0.1250*noise( uv ); uv = m*uv;
    f += 0.0625*noise( uv ); uv = m*uv;
    return f;
}


void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    float t = smoothstep(0., 200.,iTime);
     float n = fractalNoise(uv)*t;
   
    // uv   *= n;
   
    float z = 0.0;
    z += wave(uv.x, uv.y);
    z += wave((uv.x+(n)), uv.y+(n));
    z += wave((1.-uv.x), 1.-uv.y);
    z += wave((1.-(uv.x+(n))), 1.-(uv.y+(n)));
    //z += wave((1.-uv.x+(n)), 1.-uv.y+(n));

    
    
    //z *= 4.0 * sin(1.57 / 5.0);
    float d = fract(z);
    //if(mod(z, n*3.) > 2.) d = 1.-d;
    if(mod(z, 2.0) > 1.) d = 1.-d;
     

    d = d/fwidth(z);
   d = smoothstep(-1.,1., d);
    vec3 rgb=vec3(d);
    rgb =((1.-rgb)*.3)+(vec3(21, 23, 59)/255.*1.);
     //rgb = rgb* vec3(15, 19, 61)/255.;
     
    //if (d >= .5)
   // {
    //   rgb = (0.0001*rgb)+(vec3(15, 19, 61)/255.);
   // }
  //  else 
   // {
  //    rgb =(1.-rgb) * vec3(71, 77, 148)/255.;
   // }
    
    gl_FragColor = vec4(rgb,1);

}

  `;

  return (
    <mesh>
      <boxGeometry args={[100, 100]} />
      <shaderMaterial
        ref={ref}
        attach='material'
        fragmentShader={shader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: {
            value: new Vector3(window.innerWidth, window.innerHeight, 0),
          },
        }}
      />
    </mesh>
  );
};
