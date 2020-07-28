//% weight=100 color=#008080 
namespace circle{
    //% block="color %color"
    //% color.shadow="colorindexpicker"
    export function colorIndexPicker(color:number){
        return color
    }
    //% block=" random color excluding %n colors: || %c1 %c2"
    //% n.min=0 n.max=2 n.defl=0
    //% c1.min=0 c1.max=15 c1.defl=0
    //% c2.min=0 c2.max=15 c2.defl=15
    export function randomColor(n:number = 0, c1:number = 0, c2: number = 15): number{
        switch(n) { 
            case 0: {    
                c1 = -1
                c2 = -1
                break; 
            }
            case 1: { 
                c2 = -1
                break; 
            } 
            default: { 
                break; 
            } 
        } 
        let clr = randint(0, 15)
        while(clr == c1 || clr == c2) { // c1 or c2 = -1 will not be color
            let clr = randint(0, 15)
        }
        return clr
    }
    //% block="erase fill from %c=variables_get(myCircleSprite)"
    export function unfill(c: Sprite) {
        sprites.setDataNumber(c, "fillColor", 0)
        makeCircle(c)
    }
    //% block="%c=variables_get(myCircleSprite) fill color"
    export function getFillColor(c:Sprite) {
        return sprites.readDataNumber(c, "fillColor")
    }
    //% block="fill %c=variables_get(myCircleSprite) with color $fillColor"
    //% fillColor.min=0 fillColor.max=15 fillColor.defl=2
    export function setFill(c: Sprite, fillColor: number =  0){
        sprites.setDataNumber(c, "color", 0) // because a few pixels show after fill
        makeCircle(c)
        sprites.setDataNumber(c, "fillColor", fillColor % 16)
        makeCircle(c)
    }
    //% block="%c=variables_get(myCircleSprite) color"
    export function getColor(c:Sprite): number {
        return sprites.readDataNumber(c, "color")
    }
    //% block="set %c=variables_get(myCircleSprite) color to %color"
    //% color.min=0 color.max=15 color.defl=2
    export function setColor(c: Sprite, color: number) {
        sprites.setDataNumber(c, "color", color % 16)
        makeCircle(c)
    }
    //% block="%c=variables_get(myCircleSprite) radius"
    export function getRadius(c: Sprite): number {
        return sprites.readDataNumber(c, "radius")
    }
    //% blockSetVariable=myCircleSprite
    //% block="create circle of radius %radius color %color || fill-color %fillColor"
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% fillColor.min=0 fillColor.max=15 fillColor.defl=0
    export function createCircle(radius: number, color: number , fillColor:number = 0 ): Sprite {
        let circleImage = image.create(2 * radius + 2, 2 * radius  + 2);   
        let centerX = radius + 1
        let centerY = radius + 1
        let c = sprites.create(circleImage)
        sprites.setDataNumber(c, "radius", radius)
        sprites.setDataNumber(c, "centerX", centerX)
        sprites.setDataNumber(c, "centerY", centerY)
        sprites.setDataNumber(c, "color", color % 16)
        sprites.setDataNumber(c, "fillColor", fillColor % 16)
        makeCircle(c)
        return c
    }
    function makeCircle(c:Sprite){
        let radius = sprites.readDataNumber(c,"radius")
        let color = sprites.readDataNumber(c,"color")
        let centerX = sprites.readDataNumber(c,"centerX")
        let centerY = sprites.readDataNumber(c,"centerY")
        let fillColor = sprites.readDataNumber(c,"fillColor")
        if (fillColor == 0)
        {
            c.image.drawCircle(centerX, centerY, radius, color)
        } else {
            c.image.fillCircle(centerX, centerY,  radius, fillColor)
        }
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




















