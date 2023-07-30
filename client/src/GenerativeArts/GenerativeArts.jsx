import React from 'react'
import { endpoint, templateLayers, executeScript, stopGraphics } from '../common'

const GenerativeArts = () => {
    const sendcode = (layerNumber) => {
        endpoint(`play ${window.chNumber}-${layerNumber} [html] xyz.html`);
        const script = `
        const gadiv=document.createElement('div');
        gadiv.style.position='absolute';
        gadiv.setAttribute('id','divid_' + '${layerNumber}');
        gadiv.style.zIndex = ${-layerNumber};
        document.body.appendChild(gadiv);

            function createCanvas(canvasId) {
                const canvas = document.createElement('canvas');
                canvas.id = canvasId;
                gadiv.appendChild(canvas);
            }
                createCanvas('canvas1');
                createCanvas('canvas2');
                function createStyles() {
                const style = document.createElement('style');
                style.innerHTML = \`
                * {
                     margin: 0; 
                     padding: 0;
                      box- sizing: border-box;
                       font - size: 20px; 
                       font - family: 'Cuprum', sans - serif;
                    }
                    #canvas1 {
                     position: absolute; 
                     top: 50 %;
                      left: 50 %;
                       transform: translate(-50 %, -50 %);
                    }
                    #canvas2 { 
                        position: absolute; 
                        top: 50 %;
                         left: 50 %;
                          transform: translate(-50 %, -50 %);
                    }
                    #animationCanvas {
                     position: absolute;
                      top: 0; 
                      left: 0; 
                    } 
                button {
                     padding: 10px 40px;
                      text - shadow: 1px 1px rgba(255, 255, 255, 0.5); 
                      width: 220px; 
                      font - family: 'Lilita One', sans - serif; 
                    } 
                    #controls {
                         position: absolute;
                          padding: 10px; 
                          left: 20px; 
                          top: 20px; 
                          width: 250px; 
                          border: 2px solid black;
                           background: rgba(0, 0, 0, 0.2);
                         } 
                         #controlsHeader {
                             margin - top: 30px; 
                             font - family: 'Lilita One', cursive;
                             } 
                             #info {
                                 position: absolute;
                                  right: 0;
                                   bottom: 0; 
                                   width: 30 %; 
                                   text - align: left; 
                                   padding: 30px;
                                    font - size: 15px;
                                     color: white; 
                                    } 
                                    #info a {
                                         font - size: 15px;
                                          color: magenta; 
                                        } ;\`;
                document.head.appendChild(style);
            }
            createStyles();
            const canvas = document.getElementById('canvas1');
            const ctx = canvas.getContext('2d');
            canvas.width = 900;
            canvas.height = 900;
            ctx.lineCap = 'round';
            ctx.shadowColor = 'rgba(0,0,0,0.7)';
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 10;
            const canvas2 = document.getElementById('canvas2');
            const ctx2 = canvas2.getContext('2d');
            canvas2.width = window.innerWidth;canvas2.height = window.innerHeight;
            class Fractal {
                constructor(canvasWidth, canvasHeight){
                    this.canvasWidth = canvasWidth;
                    this.canvasHeight = canvasHeight;
                    this.size = this.canvasWidth < this.canvasHeight ? this.canvasHeight * 0.3 : this.canvasHeight * 0.3;
                    this.maxLevel = 5;
                    this.scale = 0.8;
                    this.branches = Math.random() * 3 + 1;
                    this.spread = Math.random() * 0.2 + 0.2;
                    this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
                    this.lineWidth = 6;this.sides = Math.floor(Math.random() * 3 + 3);
                    ;}
                    drawBranch(level, context){
                        if (level > this.maxLevel) return;
                        context.beginPath();
                        context.moveTo(0,0);
                        context.lineTo(this.size, 0);
                        context.stroke();
                        context.save();
                        context.translate(this.size * 0.1, 0);
                        context.scale(this.scale, this.scale);
                        context.save();
                        context.rotate(this.spread);
                        this.drawBranch(level + 1, context);
                        context.restore();
                        context.restore();
                        context.save();
                        context.translate(this.size * 0.5, 0);
                        context.scale(this.scale, this.scale);
                        context.save();
                        context.rotate(this.spread * 1.5);
                        this.drawBranch(level + 1, context);
                        context.restore();
                        context.restore();
                        context.save();context.translate(this.size * 0.6, 0);
                        context.scale(this.scale * 0.3, this.scale * 0.3);
                        context.save();
                        context.rotate(this.spread * 0.5);
                        this.drawBranch(level + 1, context);
                        context.restore();
                        context.restore();context.beginPath();
                        context.arc(this.size * 1.1,0,this.size * 0.09, 0, Math.PI * 2);
                        context.fill();
                    }
                    draw(context){
                        context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                        context.strokeStyle =  this.color;context.fillStyle =  this.color;
                        context.lineWidth = this.lineWidth;
                        context.save();
                        context.translate(this.canvasWidth/2, this.canvasHeight/2);
                        for (let i = 0; i < this.sides; i++){
                            context.rotate((Math.PI * 2)/this.sides);
                            this.drawBranch(0, context);
                        }
                        context.restore();
                    }}
                    class Rain {
                        constructor(canvasWidth, canvasHeight, image, ctx){
                            this.canvasWidth = canvasWidth;
                            this.canvasHeight = canvasHeight;
                            this.numberOfParticles = 10;
                            this.particles = [];this.image = image;
                            this.ctx = ctx;
                            this.initialize();
                        }
                        initialize(){
                            for (let i = 0; i < this.numberOfParticles; i++){
                                this.particles.push(new Particle(this.canvasWidth, this.canvasHeight, this.image));
                            }
                        }
                            run(){
                                this.particles.forEach(particle => {
                                    particle.draw(this.ctx);
                                    particle.update();
                                });
                            }
                        }
                                    class Particle {
                                        constructor(canvasWidth, canvasHeight, image){
                                            this.canvasWidth = canvasWidth;
                                            this.canvasHeight = canvasHeight;
                                            this.image = image;
                                            this.sizeModifier = Math.random() * 0.4 + 0.1;this.width = this.image.width * this.sizeModifier;
                                            this.height = this.image.height * this.sizeModifier;
                                            this.x = Math.random() * this.canvasWidth;
                                            this.y = Math.random() * this.canvasHeight;
                                            this.speed = Math.random() * 1 + 1;this.image = image;
                                            this.angle = 0;
                                            this.va = Math.random() * 0.05 - 0.025;
                                        }
                                        update(){
                                            this.angle += this.va;
                                            if (this.y < -this.height) {
                                                this.y = this.canvasHeight + this.height;
                                                this.x = Math.random() * (this.canvasWidth - this.width);
                                                this.angle = 0;
                                            } else this.y -= this.speed;
                                        }
                                        draw(context){
                                            context.save();
                                            context.translate(this.x, this.y);
                                            context.rotate(this.angle);
                                            context.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
                                            context.restore();
                                        }
                                    }
                                    const fractal = new Fractal(canvas.width, canvas.height);
                                    fractal.draw(ctx);
                                    const fractalImage = new Image();
                                    fractalImage.src = canvas.toDataURL();
                                    fractalImage.onload = function(){
                                        const rain = new Rain(canvas2.width, canvas2.height, fractalImage, ctx2);
                                        rain.initialize();
                                        function animate(){
                                            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                                            rain.run();
                                            requestAnimationFrame(animate);
                                        }
                                        animate();
                                    }
                               `
        executeScript(script); //for html

        setTimeout(() => {
            endpoint(`play ${window.chNumber}-${layerNumber} [HTML] xyz.html`);
        }, 250);
        setTimeout(() => {
            endpoint(`call ${window.chNumber}-${layerNumber} "
                   ${script}
                    "`);
        }, 300);


    }
    return (
        <div>
            GenerativeArts
            <button onClick={() => sendcode(templateLayers.GenerativeArts)}> Send</button>
            <button onClick={() => stopGraphics(templateLayers.GenerativeArts)}> Send</button>
        </div>
    )
}

export default GenerativeArts
