//% weight=100 color=#008080 
namespace circle{
    //% block="color %color"
    //% color.shadow="colorindexpicker"
    export function colorIndexPicker(color:number){
        return color
    }
    //% block=" random color excluding %n colors: || %c1 %c2 %c3"
    //% inlineInputMode=inline
    //% n.min=0 n.max=3 n.defl=2
    //% c1.min=0 c1.max=15 c1.defl=0
    //% c2.min=0 c2.max=15 c2.defl=15
    //% c3.min=0 c3.max=15 c3.defl=0
    export function randomColor(n:number = 2, c1:number = 0, c2: number = 15, c3:number = 0): number{
        switch(n) { 
            case 0: {    
                c1 = -1
                c2 = -1
                c3 = -1
                break; 
            }
            case 1: { 
                c2 = -1
                c3 = -1
                break; 
            } 
            case 2: { 
                c3 = -1
                break; 
            } 
            default: { 
                break; 
            } 
        } 
        let clr = randint(0, 15)
        // c1 or c2 or c3 = -1 will not be color
        while(clr == c1 || clr == c2 || clr == c3) { 
            clr = randint(0, 15)
        }
        return clr
    }
    //% block="erase fill from %c=variables_get(myCircleSprite)"
    export function unfill(c: Sprite) {
        sprites.setDataBoolean(c, "filled", false)
        makeCircle(c)
    }
    //% block="fill %c=variables_get(myCircleSprite)"
    export function fill(c: Sprite){
        sprites.setDataBoolean(c, "filled", true)
        makeCircle(c)
    }
    //% block="%c=variables_get(myCircleSprite) filled"
    export function getFilled(c:Sprite): boolean {
        return sprites.readDataBoolean(c,"filled" )
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
    // https://github.com/WeCodeMakeCode/circle-ext-with-data-ext/blob/master/README.md
    //% help=#Create
    //% blockSetVariable=myCircleSprite
    //% block="create circle of radius %radius color %color || filled %fillColor"
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% fill.defl=false
    export function create(radius: number, color: number , filled:boolean = false ): Sprite {
        let circleImage = image.create(2 * radius + 2, 2 * radius  + 2);   
        let centerX = radius + 1
        let centerY = radius + 1
        let c = sprites.create(circleImage)
        sprites.setDataNumber(c, "radius", radius)
        sprites.setDataNumber(c, "centerX", centerX)
        sprites.setDataNumber(c, "centerY", centerY)
        sprites.setDataNumber(c, "color", color % 16)
        sprites.setDataBoolean(c, "filled", filled)
        makeCircle(c)
        return c
    }
    function makeCircle(c:Sprite){
        let radius: number = sprites.readDataNumber(c,"radius")
        let color: number = sprites.readDataNumber(c,"color")
        let centerX: number = sprites.readDataNumber(c,"centerX")
        let centerY: number = sprites.readDataNumber(c,"centerY")
        let filled: boolean = sprites.readDataBoolean(c,"filled")
        if (filled){
            c.image.fillCircle(centerX, centerY,  radius, color)
        } else{
            c.image.fillCircle(centerX, centerY,  radius, 0)
        }
        c.image.drawCircle(centerX, centerY, radius, color)
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




















