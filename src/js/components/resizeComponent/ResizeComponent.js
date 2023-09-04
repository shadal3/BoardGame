import * as PIXI from 'pixi.js';


export class ResizeComponent extends PIXI.Container {

  resizeHandler(container, baseScale) {
    const recoveredScaleX = baseScale * window.globalScaleFactorX;
    const recoveredScaleY = baseScale * window.globalScaleFactorY;
    
    container.scale.set(
      recoveredScaleX,
      recoveredScaleY
    );
    
    let shrinkScale = !window.isPortrait
      ? this.calculateShrinkScale(0, 630)
      : this.calculateShrinkScale(650, 0);
    
    if (shrinkScale != null) {
      container.scale.set(
        recoveredScaleX * shrinkScale,
        recoveredScaleY * shrinkScale
      )
    }
  };
  
   calculateShrinkScale(widthBorder, heightBorder) {
    if (window.innerWidth < widthBorder && window.innerHeight < heightBorder) {
      return Math.min(window.innerHeight / heightBorder,  window.innerWidth / widthBorder);
    }
    if (window.innerHeight < heightBorder) {
      return window.innerHeight / heightBorder
    }
    if (window.innerWidth < widthBorder)  {
      return window.innerWidth / widthBorder;
    }
    return null;
  }
}