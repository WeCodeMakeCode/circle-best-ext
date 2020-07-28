//% weight=100 color=#008080 
//% groups=[ "Create", "Properties",  "Actions, "List"]
namespace circle{
    //% group="Create" 
    //% blockSetVariable=myCircleSprite
    //% block="create circle of radius %radius color %color || fill-color %fillColor"
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //  color.shadow="colorindexpicker"
    //% fillColor.min=0 fillColor.max=15 fillColor.defl=0
    //  color.shadow="colorindexpicker"
    //  fillColor.shadow="colorindexpicker"
    export function createCircle(radius: number, color: number , fillColor:number = 0 ): Sprite {
        let circleImage = image.create(2 * radius + 2, 2 * radius  + 2);   
        let centerX = radius + 1
        let centerY = radius + 1
        let circle = sprites.create(circleImage)
        sprites.setDataNumber(circle, "radius", radius)
        sprites.setDataNumber(circle, "centerX", centerX)
        sprites.setDataNumber(circle, "centerY", centerY)
        sprites.setDataNumber(circle, "color", color)
        sprites.setDataNumber(circle, "fillColor", fillColor)
        makeCircle(circle)
        return circle
    }
    function makeCircle(circle:Sprite){
        let radius = sprites.readDataNumber(circle,"radius")
        let color = sprites.readDataNumber(circle,"color")
        let centerX = sprites.readDataNumber(circle,"centerX")
        let centerY = sprites.readDataNumber(circle,"centerY")
        let fillColor = sprites.readDataNumber(circle,"fillColor")
        let circleImage = circle.image
        if (fillColor == 0)
        {
            circleImage.drawCircle(centerX, centerY, radius, color)
        } else {
            circleImage.fillCircle(centerX, centerY,  radius, fillColor)
        }
    }
    //% group="Properties" 
    //% blockSetVariable="circle color"
    //% block="%circle=variables_get(myCircleSprite) color"
    export function getColor(circle:Sprite): number {
        return sprites.readDataNumber(circle, "color")
    }
    //% group="Properties"  
    //% block="set %circle=variables_get(myCircleSprite) color to %color"
    export function setColor(circle: Sprite, color: number) {
        sprites.setDataNumber(circle, "color", color)
        makeCircle(circle)
    }
    //% group="Properties" 
    //% blockSetVariable="circle radius"
    //% block="%circle=variables_get(myCircleSprite) radius"
    export function getRadius(circle: Sprite): number {
        return sprites.readDataNumber(circle, "radius")
    }
    //% group="Actions" 
    //% block="erase fill from %circle=variables_get(myCircleSprite)"
    export function unfill(circle: Sprite) {
        sprites.setDataNumber(circle, "fillColor", 0)
        makeCircle(circle)
    }
    //% group="Properties" 
    //% blockSetVariable="circle fill color"
    //% block="%circle=variables_get(myCircleSprite) fill color"
    export function getFillColor(circle:Sprite) {
        return sprites.readDataNumber(circle, "fillColor")
    }

    //% group="Actions" 
    //% block="fill %Circle=variables_get(myCircleSprite) with color $color"
    export function setFill(circle: Sprite, fillColor: number =  0){
        sprites.setDataNumber(circle, "fillColor", fillColor)
        makeCircle(circle)
    }
}

namespace sprites {
    /**
     * Sets a number in the data of a sprite
     */
    //% blockId=spriteDataSetNumber block="set $sprite=variables_get(mySprite) data $name to number $value"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function setDataNumber(sprite: Sprite, name: string, value: number) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }

    /**
     * Change a number in the data of a sprite by a given value
     */
    //% blockId=spriteDataChangeNumber block="change $sprite=variables_get(mySprite) data $name by number $value"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function changeDataNumberBy(sprite: Sprite, name: string, value: number) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = (d[name] || 0) + value;
    }

    /**
     * Gets a number in the data of a sprite
     */
    //% blockId=spriteDataGetNumber block="$sprite=variables_get(mySprite) data $name as number"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function readDataNumber(sprite: Sprite, name: string): number {
        if (!sprite || !name) return 0;
        const d = sprite.data;
        return d[name] as number;
    }

    /**
     * Sets a string in the data of a sprite
     */
    //% blockId=spriteDataSetString block="set $sprite=variables_get(mySprite) data $name to string $value"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function setDataString(sprite: Sprite, name: string, value: string) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }

    /**
     * Gets a number in the data of a sprite
     */
    //% blockId=spriteDataGetString block="$sprite=variables_get(mySprite) data $name as string"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function readDataString(sprite: Sprite, name: string): string {
        if (!sprite || !name) return "";
        const d = sprite.data;
        return d[name] as string;
    }

    /**
     * Sets a boolean in the data of a sprite
     */
    //% blockId=spriteDataSetBoolean block="set $sprite=variables_get(mySprite) data $name to boolean $value"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function setDataBoolean(sprite: Sprite, name: string, value: boolean) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = !!value;
    }

    /**
     * Gets a boolean in the data of a sprite
     */
    //% blockId=spriteDataGetBoolean block="$sprite=variables_get(mySprite) data $name as boolean"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function readDataBoolean(sprite: Sprite, name: string): boolean {
        if (!sprite || !name) return false;
        const d = sprite.data;
        return !!d[name];
    }

    /**
     * Sets a sprite in the data of a sprite
     */
    //% blockId=spriteDataSetSprite block="set $sprite=variables_get(mySprite) data $name to sprite $value=variables_get(mySprite2)"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function setDataSprite(sprite: Sprite, name: string, value: Sprite) {
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }

    /**
     * Gets a sprite in the data of a sprite
     */
    //% blockId=spriteDataGetSprite block="$sprite=variables_get(mySprite) data $name as sprite"
    //% group="Data"
    //% weight=10
    //% blockGap=8
    export function readDataSprite(sprite: Sprite, name: string): Sprite {
        if (!sprite || !name) return undefined;
        const d = sprite.data;
        return d[name] as Sprite;
    }


    /**
     * Sets an image in the data of a sprite
     */
    //% blockId=spriteDataSetImage block="set $sprite=variables_get(mySprite) data $name to image $value=screen_image_picker"
    //% group="Data"
    //% weight=9
    //% blockGap=8
    //% value.shadow.image(image.create(16,16))'
    export function setDataImage(sprite: Sprite, name: string, value: Image){
        if (!sprite || !name) return;
        const d = sprite.data;
        d[name] = value;
    }

    /**
     * Gets an image in the data of a sprite
     */
    //% blockId=spriteDataGetImage block="$sprite=variables_get(mySprite) data $name as image"
    //% group="Data"
    //% weight=9
    //% blockGap=8
    export function readDataImage(sprite: Sprite, name: string): Image {
        if (!sprite || !name) return undefined;
        const d = sprite.data;
        return d[name] as Image;
    }
}




















