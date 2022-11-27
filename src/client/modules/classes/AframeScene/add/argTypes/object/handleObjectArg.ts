import { handleAvatar } from "./objectTypes/avatar/handleAvatar";

export function handleObjectArg(arg: any, resolve: any, reject: any) {
    console.log("Object Argument Found.");
    if(!arg.type) {
        console.error("CS1.scene.add(arg), where arg is an object must contain a type property with a valid string value.");
        reject();
    }
    switch (arg.type) {
        case "avatar":
            handleAvatar(arg, resolve, reject);
        break;
        default:
            resolve("YOUR TYPE IS NOT KNOWN");
    }
    console.log(`The requested object type is ${arg.type}.`)

}