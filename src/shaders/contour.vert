varying vec2 vPosition;

void main()	{
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	vPosition = modelPosition.xy * 0.7 + 0.5; 
	gl_Position = modelPosition;
}

