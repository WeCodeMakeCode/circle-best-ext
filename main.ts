
/**
 * Circle extension creates a sprite with data for color, radius and fill/unfilled state
 * Circle extension also provides the colorIndexPicker for use in any block where a color is required
 * and provides a random color generator with the ability to exclude up to 3 colors.

 */
//% weight=100 color=#008080 
namespace circle{
    /**
     * Returns selected color
     */
    //% blockId=colorIndexPicker
    //% block="color %color"
    //% color.shadow="colorindexpicker"
    //% help=circle/color-index-picker
    export function colorIndexPicker(color:number){
        return color
    }
    /**
     * returns a random color 0-15 excluding up to 3 colors
     */
    //% blockId=randomColor
    //% block=" random color || excluding %n colors: %c1 %c2 %c3"
    //% inlineInputMode=inline
    //% n.min=0 n.max=3 n.defl=2
    //% c1.min=0 c1.max=15 c1.defl=0
    //% c2.min=0 c2.max=15 c2.defl=15
    //% c3.min=0 c3.max=15 c3.defl=0
    //% help=circle/random-color
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
    /**
     * Erases fill from circle
     */
    //% blockId=unfill
    //% block="erase fill from %c=variables_get(myCircleSprite)"
    //% help=circle/unfill
    export function unfill(c: Sprite) {
        sprites.setDataBoolean(c, "filled", false)
        makeCircle(c)
    }
    /**
     * Fills a circle with the previously set color
     */
    //% blockId=fill
    //% block="fill %c=variables_get(myCircleSprite)"
    //% help=circle/fill
    export function fill(c: Sprite){
        sprites.setDataBoolean(c, "filled", true)
        makeCircle(c)
    }
    /**
     * Returns true if circle filled, false otherwise
     */
    //% blockId=getFilled
    //% block="%c=variables_get(myCircleSprite) filled"
    //% help=circle/get-filled
    export function getFilled(c:Sprite): boolean {
        return sprites.readDataBoolean(c,"filled" )
    }
    /**
     * Returns the color of a circle
     */
    //% blockId=getColor
    //% block="%c=variables_get(myCircleSprite) color"
    //% help=circle/get-color
    export function getColor(c:Sprite): number {
        return sprites.readDataNumber(c, "color")
    }
    /**
     * Set the color of a circle
     */
    //% blockId=setColor
    //% block="set %c=variables_get(myCircleSprite) color to %color"
    //% color.min=0 color.max=15 color.defl=2
    //% help=circle/set-color
    export function setColor(c: Sprite, color: number) {
        sprites.setDataNumber(c, "color", color % 16)
        makeCircle(c)
    }
    /**
     * Return the radius of a circle
     */
    //% blockId=getRadius
    //% block="%c=variables_get(myCircleSprite) radius"
    //% help=circle/get-radius
    export function getRadius(c: Sprite): number {
        return sprites.readDataNumber(c, "radius")
    }
    /**
     * Create and returns a circle object
     */
    //% blockId=creaeCircle
    //% blockSetVariable=myCircleSprite
    //% block="create circle of radius %radius color %color || filled %fillColor"
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% fill.defl=false
    //% help=circle/create-circle
    export function createCircle(radius: number, color: number , filled:boolean = false ): Sprite {
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
    /**
     * Draws a circle in a sprite using info from sprite data
     */
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

